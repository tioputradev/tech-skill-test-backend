const { StatusCodes } = require("http-status-codes");
const NotFound = require("../../errors/not-found");
const { requestJobsData, requestJobDetail } = require("./provider");

const getAllJobs = async (req, res, next) => {
  try {
    const { description, location, full_time } = req.query;

    // "The API should make http request to http..."
    let data = await requestJobsData();

    // if description provided then we filter data by description
    if (description) {
      data = data.filter((d) => {
        return d.description.includes(description);
      });
    }

    // if location provided then we filter data by location
    if (location) {
      data = data.filter((d) => {
        if (d.location.toUpperCase() == location.toUpperCase()) return d;
      });
    }

    // if full_time provided then we filter data by full_time
    if (full_time == 1) {
      data = data.filter((d) => {
        if (d.type == "Full Time") return d;
      });
    }

    // handle pagination
    const page = parseInt(req.query.page ? req.query.page : 1);
    const limit = parseInt(req.query.limit ? req.query.limit : 8);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    data = data.slice(startIndex, endIndex);

    res
      .status(StatusCodes.OK)
      .json({ page, totalItems: data.length, data: data });
  } catch (error) {
    next(error);
  }
};

const getJobDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    // get job detail by requst to external api
    const findJobDetail = await requestJobDetail(id);

    // if job not found return 404
    if (!findJobDetail) throw new NotFound("JOB_NOT_FOUND");

    res.status(StatusCodes.OK).json({ data: findJobDetail });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllJobs, getJobDetail };
