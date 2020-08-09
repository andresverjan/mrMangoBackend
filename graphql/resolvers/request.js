const Request = require('../../models/request');
const RequestObs = require('../../models/requestObs');

module.exports = {

    /*requests: async (args) => {
        try {
            const requestList = Request.find().populate({path: 'observations', populate: 'observations'});

            return requestList;
        } catch (error) {
            throw error;
        }
    },*/
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

    /*getDetailByRequestId: async (args) => {
        try {
            const { requestId }= args;
            request = await Request.findOne({ _id: requestId });
            
            return request.details;
        } catch (error) {
            throw error;
        }
    },*/

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

    //TODO Te mando un abrazito a la distancia cosa

    /*getMyRequest: async (args) => {
        try {
            const { userId } = args,
            requestList = await Request.find({ userId });

            return requestList;
        } catch (error) {
            throw error;
        }
    },*/
    getMyRequest: async args => {
        try {
            console.log("argumentos ");
            console.log(args);
            const userId = args.userId;
            //console.log("el  userId es: " + userId);

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
                                    },
                                    {
                                        "$lookup": {
                                            "from": "requestdetailsadditions",
                                            "let": { "requestDetails_id": "$_id" },
                                            "pipeline": [
                                                { "$match": { "$expr": { "$eq": ["$requestDetailsId", "$$requestDetails_id"] } } },
                                                {
                                                    "$lookup": {
                                                        "from": "additions",
                                                        "let": { "addition_id": "$additionId" },
                                                        "pipeline": [
                                                            { "$match": { "$expr": { "$eq": ["$_id", "$$addition_id"] } } }
                                                        ],
                                                        "as": "addon"
                                                    }
                                                }
                                            ],
                                            "as": "additions"
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
            //console.log("**********************");
            //console.log(joinTable);
            //console.log("**********************");
            //const details = await RequestDetail.find( { requestId: { $eq: requestId}});
            if (!joinTable) {
                throw new Error('not found');
            }

            const jt = 
             joinTable.map(item => {
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
                            value         : detalle.value,
                            additions     : detalle.additions.map(addicion=> { 
                                return {
                                    ...addicion.addon[0]
                                }
                            })
                        }
                    })
                }
            })
            //Ultimo request, ultimo requestDetail y sus adiciones
            //console.log(jt[jt.length - 1].details[jt[jt.length - 1].details.length - 1].additions)
            return jt
        }
        catch (error) {
            throw error
        }
    },

    /*createRequest: async (args) => {
        try {
            const requestInfo = args.request,
                request = await Request.create({
                    ...requestInfo,
                    status: 1,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                });

            return request;
        } catch (error) {
            throw error;
        }
    },*/
    createRequest: async args => {
        try {
            const { userId, latlng, total, details } = args.request

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
            responseDetails = await RequestDetail.insertMany(newDetail);

            let arrAdditionsPerDetail = [];
            newDetail.map((item, idx) => {
                if (item.additions) {
                    responseDetails.forEach(responseItem => {
                        if (responseItem.carSubproductoId === item.carSubproductoId) {
                            newDetail[idx].additions.forEach(addition => {
                                arrAdditionsPerDetail.push({
                                    additionId: addition.id,
                                    requestDetailsId: responseItem._id
                                });
                            })
                        }
                    });
                }
            });

            await RequestDetailsAdditions.insertMany(arrAdditionsPerDetail);

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

    cancelRequest: async args => {
        try {
            const { userId, _id, observations } = args.request
            const request = new Request({
                _id: _id,//observations.requestId,
                updatedAt: new Date().toISOString(),
                status: 4
            });
            console.log('QUE VIENE AQUÍ: ', _id);
            console.log('Y QUE ES LO QUE VIENE AQUÍ: ', observations.requestId);
            const newRequest = await Request.findOneAndUpdate({_id: { $eq: request._id}}, { $set: request }, { new: true,  upsert: true} );
            console.log('Actualizó correctamente: ', newRequest);
            const requestObs = new RequestObs({
                requestId: request._id,
                userId,
                createdAt: new Date().toISOString(),
                status: 4,
                observation: observations.observation
            });
            console.log('Observaciones que vienen en el request', observations.observation);
            const newReqObs = await requestObs.save();
            console.log('Nuevo requestObs: ', newReqObs);
            const res = await Request.updateOne({_id: request._id}, {
                $push: {observations: newReqObs._id}
            });

            console.log('Respuesta del update: ', res);

            if (!newRequest) {
                throw new Error('Request not found');
            }

            return { ...newRequest._doc, _id: newRequest._id }
        }
        catch (error) {
            throw error
        }
    },

    /*createObsChangeStatus: async (userId, observ, requestId) => {
        try {
//            const { userId, observ, requestId } = args.request
            console.log(requestId);

            const requestObs = new RequestObs({
                userId,
                createdAt: new Date().toISOString(),
                observ,
                status: 4,
                requestId
            });

            const newObj = await requestObs.save();
            console.log(newObj);
//            return { ...newObj._doc, _id: newObj.id }
        }
        catch (error) {
            throw error
        }
    },*/

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
    },

}