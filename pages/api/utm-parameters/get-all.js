import dbConnect from "../../../lib/dbConnect";
import CampaignUrl from "../../../models/campaignUrl";
import CampaignSource from "../../../models/CampaignSource";
import CampaignMedium from "../../../models/CampaignMedium";
import CampaignName from "../../../models/CampaignName";
import CampaignTerm from "../../../models/CampaignTerm";
import CampaignContext from "../../../models/CampaignContext";
import CampaignId from "../../../models/CampaignId";

export default async (req, res) => {

    await dbConnect()

    // console.log(req.query.parameter, 'get-all')
    // console.log(req.query.user)

    switch(req.query.parameter) {
        case 'campaignUrl':
            try {

                let allResults = await CampaignUrl.find({
                    user: req.query.user,
                    })

                let arrayToReturn = allResults.map(a => a[req.query.parameter])
                res.status(201).json(arrayToReturn)

          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
          break;

        case 'campaignSource':
            try {

                let allResults = await CampaignSource.find({
                    user: req.query.user,
                    })
                let arrayToReturn = allResults.map(a => a[req.query.parameter])
                res.status(201).json(arrayToReturn)
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
          break;

          case 'campaignMedium':
            try {

                let allResults = await CampaignMedium.find({
                    user: req.query.user,
                    })
                let arrayToReturn = allResults.map(a => a[req.query.parameter])
                res.status(201).json(arrayToReturn)
        } catch (error) {
          res.status(400).json({Error: "An error has occurred. Please try again."})
        }
          break;

        case 'campaignName':
            try {

                let allResults = await CampaignName.find({
                    user: req.query.user,
                    })
                let arrayToReturn = allResults.map(a => a[req.query.parameter])
                res.status(201).json(arrayToReturn)
        } catch (error) {
          res.status(400).json({Error: "An error has occurred. Please try again."})
        }
          break;

        case 'campaignId':
            try {

                let allResults = await CampaignId.find({
                    user: req.query.user,
                    })
                let arrayToReturn = allResults.map(a => a[req.query.parameter])
                res.status(201).json(arrayToReturn)
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
            break;

        case 'campaignTerm':
            try {

                let allResults = await CampaignTerm.find({
                    user: req.query.user,
                    })
                let arrayToReturn = allResults.map(a => a[req.query.parameter])
                res.status(201).json(arrayToReturn)
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
            break;

        case 'campaignContext':
            try {

                let allResults = await CampaignContext.find({
                    user: req.query.user,
                    })
                let arrayToReturn = allResults.map(a => a[req.query.parameter])
                res.status(201).json(arrayToReturn)
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
            break;

        default:
            res.status(200);
          break;
      }

              //   console.log("CampaignUrl case")
        //   await CampaignUrl.find({ user: req.query.user }).toArray(function (err, result) {
        //         let arrayToReturn = result.map(a => a[req.query.parameter])
        //         if (err) throw err;
        //         res.json(arrayToReturn)
        //     })
}