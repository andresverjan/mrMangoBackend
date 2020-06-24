const Request = require('../../models/request')
const RequestDetail = require('../../models/requestdetails')


module.exports = {
    requests: async args => {
        try {
            const listado = await Request.find()
            return listado.map(item => {
                return {
                    ...item._doc,
                    _id       : item.id,
                    createdAt : item._doc.createdAt ? new Date(item._doc.createdAt).toISOString() : new Date().toISOString(),
                    updatedAt : item._doc.updatedAt ? new Date(item._doc.updatedAt).toISOString() : new Date().toISOString(),
                    status    : item.status ? item.status : "1",
                }
            })
        }
        catch (error) {
            throw error
        }
    },

    getDetailByRequestId: async args => {
        try {
            console.log("argumentos ");
            console.log(args);
            const requestId = args.requestId;
            console.log("el  valor es: " + requestId);
            const list = await Request.find({ _id: { $eq: requestId } });
            const details = await RequestDetail.find({ requestId: { $eq: requestId } });
            if (!list) {
                throw new Error('not found');
            }
            return list.map(item => {
                return {
                    ...item._doc,
                    _id: item.id,
                    details: details,
                    createdAt: item._doc.createdAt ? new Date(item._doc.createdAt).toISOString() : new Date().toISOString(),
                    updatedAt: item._doc.updatedAt ? new Date(item._doc.updatedAt).toISOString() : new Date().toISOString()
                }
            })
        }
        catch (error) {
            throw error
        }
    },

    getMyRequest: async args => {
        try {
            console.log("argumentos ");
            console.log(args);
            const userId = args.userId;
            console.log("el  userId es: " + userId);

            const joinTable = await Request
                .aggregate(
                    [
                        {
                            "$lookup": {
                                "from": "requestdetails",
                                "let": { "request_id": "$_id" },
                                "pipeline": [
                                    { "$match": { "$expr": { "$eq": ["$requestId", "$$request_id"] } } },
                                    {
                                        "$lookup": {
                                            "from": "subproducts",
                                            "let": { "subproducto_id": "$subproductoId" },
                                            "pipeline": [
                                                { "$match": { "$expr": { "$eq": ["$_id", "$$subproducto_id"] } } }
                                            ],
                                            "as": "subproducto"
                                        }
                                    }
                                ],
                                "as": "details"
                            }
                        },
                        {
                            "$match": {
                                "userId": userId
                            }
                        }
                    ]);
            console.log("**********************");
            console.log(joinTable);
            console.log("**********************");
            //const details = await RequestDetail.find( { requestId: { $eq: requestId}});
            if (!joinTable) {
                throw new Error('not found');
            }
            return joinTable.map(item => {
                return {
                    ...item._doc,
                    _id       : item.id, 
                    userId    : item.userId,
                    total     : item.total,
                    status    : item.status ? item.status : "1",
                    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : new Date().toISOString(),                    
                    details: item.details.map(detalle=> {
                        return  {                             
                            ...detalle.doc,
                            _id           : detalle.id,
                            requestId     : detalle.requestId,                            
                            subproductoId : detalle.subproductoId,
                            subproducto   : detalle.subproducto[0],
                            createdAt     : detalle.createdAt ? new Date(detalle.createdAt).toISOString() : new Date().toISOString(),
                            value         : detalle.value
                        }
                    })
                }
            })
        }
        catch (error) {
            throw error
        }
    },

    createRequest: async args => {
        try {
            const { userId, latlng, total, details } = args.request
            console.group(details);

            const request = new Request({
                userId,
                latlng,
                total,
                status: "1",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            const newObj = await request.save();
            let newDetail = details.map(addition => {
                return {
                    ...addition,
                    requestId: newObj._id,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            });
            console.log(newDetail);
            responseDetails = RequestDetail.insertMany(newDetail);
            console.log(responseDetails);
            return { ...newObj._doc, _id: newObj.id }
        }
        catch (error) {
            throw error
        }
    },

    updateRequest: async args => {
        try {
            const { _id, requestId, productoId, subproductoId, userId, latlng } = args.request
            const request = new Request({
                _id,
                requestId,
                productoId,
                subproductoId,
                userId,
                latlng,
                updatedAt: new Date().toISOString()
            })
            const newRequest = await Request.findOneAndUpdate(request._id, request);
            if (!newRequest) {
                throw new Error('Request not found');
            }
            return { ...newRequest._doc, _id: newRequest.id }
        }
        catch (error) {
            throw error
        }
    },

    deleteRequest: async args => {
        try {
            const { _id } = args.request
            console.log(args);
            const request = new Request({
                _id: _id
            })
            const newRequest = await request.deleteOne(request._id);
            return { ...newRequest._doc, _id: newRequest.id }
        }
        catch (error) {
            throw error
        }
    }

}