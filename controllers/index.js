
const redis = require('redis');
const path = require('path');
const client = redis.createClient(process.env.REDIS_PORT || 6379);
const axios = require('axios');

module.exports = {
  fetchCompany: (req, res) => {
    axios.get(`http://ec2-18-218-247-23.us-east-2.compute.amazonaws.com/api/graph/${path.basename(req.url)}/`)
      .then(data => {
        client.setex(path.basename(req.url), 30, JSON.stringify(data.data));
        res.send(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteCompany: (req, res) => {
    // console.log('hit delete', req.params);
    const company = req.params.company;
    Company.findOneAndDelete({ company: company }, (err, company) => {
      if (err) return console.log(err);
      console.log(`Deleted: ${company}`);
      res.json(company);
    });
  },
  editCompany: (req, res) => {
    // console.log('hit edit', req.params);
    const company = req.params.company;
    const body = req.params.body;
    // const company = HR;
    Company.findOneAndUpdate({ company: company.company }, body, (err, company) => {
      if (err) return console.log(err);
      console.log(`Updated: ${company}`);
      res.json(company);
    });
  },
  addCompany: (req, res) => {
    // console.log('hit add', req.body);
    addCompany([req.body.company_name, req.body.acronym, req.body.analyst_percent, req.body.owners], (err, result) => {
      if (err) return console.log(err);
      console.log(result);
      res.send(200);
    });
  },
  addPrice: (req, res) => {
    // console.log('hit add price');
    addPricePoint([req.body.stock_id, req.body.date, req.body.time, req.body.price], (err, result) => {
      if (err) return console.log(err);
      console.log(result);
      res.send(200);
    });
  },
};
