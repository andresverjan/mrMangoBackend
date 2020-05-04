const Request = require('../../models/request')

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
    createRequest: async args => {
        try {
            const { requestId, productoId, subproductoId, userId, latlng } = args.request
            const request = new Request({
                requestId,
                productoId,
                subproductoId,
                userId,
                latlng,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
            const newUser = await request.save();
            return { ...newUser._doc, _id: newUser.id }
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