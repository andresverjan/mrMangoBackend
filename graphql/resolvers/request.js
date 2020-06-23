const Request = require('../../models/request')
const RequestDetail = require('../../models/requestdetails')

module.exports = {
    requests: async args => {
        try {
            const listado = await Request.find()
            return listado.map(item => {
                return {
                    ...item._doc,
                    _id: item.id,
                    createdAt: item._doc.createdAt?new Date(item._doc.createdAt).toISOString():new Date().toISOString(),
                    updatedAt: item._doc.updatedAt?new Date(item._doc.updatedAt).toISOString():new Date().toISOString()
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
          const  requestId = args.requestId;
          console.log("el  valor es: " + requestId);
          const list = await Request.find( { _id: { $eq: requestId}});
          const details = await RequestDetail.find( { requestId: { $eq: requestId}});          
          if (!list) {              
            throw new Error('not found');
          }
          return list.map(item => {
            return {
                ...item._doc,            
                _id: item.id,
                details: details,
                createdAt: item._doc.createdAt?new Date(item._doc.createdAt).toISOString():new Date().toISOString(),
                updatedAt: item._doc.updatedAt?new Date(item._doc.updatedAt).toISOString():new Date().toISOString()
            }
        })
        }
        catch (error) {
            throw error
        }
       },

    getMyRequest: async args =>
    {
        try {
            console.log("argumentos ");
            console.log(args);
            const  userId = args.userId;
            console.log("el  userId es: " + userId);

           const joinTable = await Request
           .aggregate(
            [
                { 
                    "$project" : {
                        "request" : "$$ROOT",
                        "userId": 1,
                        "total":1,
                    }
                }, 
                { 
                    "$lookup" : { 
                        "localField" : "request._id", 
                        "from" : "requestdetails", 
                        "foreignField" : "requestId", 
                        "as" : "details"
                    }
                }, 
                { 
                    "$unwind" : { 
                        "path" : "$details", 
                        "preserveNullAndEmptyArrays" : false
                    }
                }, 
                { 
                    "$lookup" : { 
                        "localField" : "details.subproductoId", 
                        "from" : "subproducts", 
                        "foreignField" : "_id", 
                        "as" : "subproducts"
                    }
                }, 
                { 
                    "$unwind" : { 
                        "path" : "$subproducts", 
                        "preserveNullAndEmptyArrays" : false
                    }
                }, 
                { 
                    "$match" : { 
                        "request.userId" : "5ebdc068a9f7740017c79d1f"
                    }
                }
            ]
        );
            
            console.log("**********************");
            //console.log(joinTable);
            console.log("**********************");            
           
            //const details = await RequestDetail.find( { requestId: { $eq: requestId}});

            if (!joinTable) {
              throw new Error('not found');
            }
            return joinTable.map(item => {
                console.log(item);
              return {
                  ...item._doc,            
                  _id: item.id,
                  total : item.request.total,
                  userId: item.request.userId,
                  createdAt: item.request.createdAt,
                  details : [item.details],
                  subproducto : item.subproducts
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
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            
            const newObj = await request.save();
            let newDetail= details.map(addition => {
                return {
                    ...addition,
                    requestId: newObj._id,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                } 
            });
            console.log(newDetail);
            responseDetails= RequestDetail.insertMany(newDetail);
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