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

    switch(req.body.parameter) {
        case 'campaignUrl':
          try {
            await CampaignUrl.create({
              campaignUrl: req.body.parameterValue,
              user: req.body.user,
            })
            res.status(201).json({Success: "Success - campaignUrl was saved."})
          } catch (error) {
            console.log(error)
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
          break;

        case 'campaignSource':
          try {
            await CampaignSource.create({
              campaignSource: req.body.parameterValue,
              user: req.body.user,
            })
            res.status(201).json({Success: "Success - campaignSource was saved."})
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
          break;

          case 'campaignMedium':
        try {
          await CampaignMedium.create({
            campaignMedium: req.body.parameterValue,
            user: req.body.user,
          })
          res.status(201).json({Success: "Success - campaignMedium was saved."})
        } catch (error) {
          res.status(400).json({Error: "An error has occurred. Please try again."})
        }
          break;

        case 'campaignName':
        try {
          await CampaignName.create({
            campaignName: req.body.parameterValue,
            user: req.body.user,
          })
          res.status(201).json({Success: "Success - campaignName was saved."})
        } catch (error) {
          res.status(400).json({Error: "An error has occurred. Please try again."})
        }
          break;

        case 'campaignId':
          try {
            await CampaignId.create({
              campaignId: req.body.parameterValue,
              user: req.body.user,
            })
            res.status(201).json({Success: "Success - campaignId was saved."})
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
            break;

        case 'campaignTerm':
          try {
            await CampaignTerm.create({
              campaignTerm: req.body.parameterValue,
              user: req.body.user,
            })
            res.status(201).json({Success: "Success - campaignTerm was saved."})
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
            break;

        case 'campaignContext':
          try {
            await CampaignContext.create({
              campaignContext: req.body.parameterValue,
              user: req.body.user,
            })
            res.status(201).json({Success: "Success - campaignContext was saved."})
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
            break;

        default:
          break;
      }
}