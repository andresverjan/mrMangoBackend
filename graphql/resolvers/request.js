
const Request = require("../../models/request");
const helpers = require("../../helpers");

module.exports = {
    requests: async (args) => {

        let where = {};
        if (args.filter != null && args.filter != undefined) {
            where = helpers.getFilterFormObject(args.filter);
        }

        let sort = { updatedAt: "asc" };
        if (args.order != null && args.order != undefined) {
            sort = helpers.getOrderFromObject(args.order);
        }

        try {
            const requestList = Request.find(where).sort(sort)
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'details.subproducto', model: 'subproducts' })
                .populate({ path: 'details.additions.addition' });
            return requestList;
        } catch (error) {
            throw error;
        }
    },

    getDetailByRequestId: async (args) => {
        try {
            const { requestId } = args;
            request = await Request.findOne({ _id: requestId }).populate({ path: 'observations', populate: 'oservations' });

            return request;
        } catch (error) {
            throw error;
        }
    },

    getMyRequest: async (args) => {
        try {
            const { userId } = args,
                requestList = await Request.find({ userId })
                    .populate({ path: 'details.subproducto', model: 'subproducts' })
                    .populate({ path: 'details.additions.addition' });
            return requestList;
        } catch (error) {
            throw error;
        }
    },

    createRequest: async (args) => {
        try {
            //const currentDate =  helpers.getCurrentDateTime();
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
    },

    updateRequest: async (args) => {
        try {
            const {
                _id,
                requestId,
                productoId,
                subproductoId,
                userId,
                latlng,
            } = args.request;
            const request = new Request({
                _id,
                requestId,
                productoId,
                subproductoId,
                userId,
                latlng,
                updatedAt: new Date().toISOString(),
            });
            const newRequest = await Request.findOneAndUpdate(
                request._id,
                request
            );
            if (!newRequest) {
                throw new Error("Request not found");
            }
            return { ...newRequest._doc, _id: newRequest.id };
        } catch (error) {
            throw error;
        }
    },

    deleteRequest: async (args) => {
        try {
            const { _id } = args.request;
            console.log(args);
            const request = new Request({
                _id: _id,
            });
            const newRequest = await request.deleteOne(request._id);
            return { ...newRequest._doc, _id: newRequest.id };
        } catch (error) {
            throw error;
        }
    },

    acceptRequest: async (args) => {
      try {
        const { _id } = args.request;
  
        let request = await Request.findById(_id);
        request = {
          ...request._doc,
          status: "2",
          updatedAt: new Date(),
        };
  
        const newRequest = await Request.findByIdAndUpdate(request._id, request);
  
        if (!newRequest) {
          throw new Error("Request not found");
        }
        return { ...newRequest._doc, _id: newRequest._id };
      } catch (error) {
        throw error;
      }
    },
    preparedRequest: async (args) => {
      try {
        const { _id } = args.request;
  
        let request = await Request.findById(_id);
  
        request = {
          ...request._doc,
          status: "4",
          updatedAt: new Date(),
        };
  
        const newRequest = await Request.findByIdAndUpdate(request._id, request);
  
        if (!newRequest) {
          throw new Error("Request not found");
        }
        return { ...newRequest._doc, _id: newRequest._id };
      } catch (error) {
        throw error;
      }
    },
    deliveredRequest: async (args) => {
      try {
        const { _id } = args.request;
  
        let request = await Request.findById(_id);
  
        request = {
          ...request._doc,
          status: "5",
          updatedAt: new Date(),
        };
  
        const newRequest = await Request.findByIdAndUpdate(request._id, request);
  
        if (!newRequest) {
          throw new Error("Request not found");
        }
        return { ...newRequest._doc, _id: newRequest._id };
      } catch (error) {
        throw error;
      }
    },
    cancelRequest: async (args) => {
      try {
        const { _id } = args.request;
  
        let request = await Request.findById(_id);
  
        request = {
          ...request._doc,
          status: "3",
          updatedAt: new Date(),
        };
  
        const newRequest = await Request.findByIdAndUpdate(request._id, request);
        if (!newRequest) {
          throw new Error("Request not found");
        }
        return { ...newRequest._doc, _id: newRequest._id };
      } catch (error) {
        throw error;
      }
    },
};
