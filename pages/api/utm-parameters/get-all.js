import dbConnect from "../../../lib/dbConnect";
import CampaignUrl from "../../../models/CampaignUrl";

export default async (req, res) => {

    await dbConnect()

    // console.log(req.query.parameter)
    // console.log(req.query)

    switch(req.query.parameter) {
        case 'campaignUrl':
        //   console.log("CampaignUrl case")
        //   await CampaignUrl.find({ user: req.query.user }).toArray(function (err, result) {
        //         let arrayToReturn = result.map(a => a[req.query.parameter])
        //         if (err) throw err;
        //         res.json(arrayToReturn)
        //     })
          break;
        // case 'campaignSource':
        //   // code block
        //   console.log("CampaignUrl case")
        //   break;
        default:
          // code block
        //   console.log("Default block")
      }

    // await (req.query.parameter).find({ user: req.query.user }).toArray(function (err, result) {
    //     let arrayToReturn = result.map(a => a[req.query.parameter])
    //     if (err) throw err;
    //     res.json(arrayToReturn)
    // })
}