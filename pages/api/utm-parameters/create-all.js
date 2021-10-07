import dbConnect from "../../../lib/dbConnect";
import CampaignUrl from "../../../models/CampaignUrl";
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
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
          break;

        case 'campaignSource':
          try {
            await CampaignSource.create({
              campaignSource: req.body.parameterValue,
              user: req.body.user,
            })
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
          } catch (error) {
            res.status(400).json({Error: "An error has occurred. Please try again."})
          }
            break;

        default:
          break;
      }
}