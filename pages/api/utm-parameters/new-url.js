import clientPromise from '../../../lib/mongodb'
// import CampaignUrl from '../../../models/campaignUrl';
// const CampaignUrl = require('../../../models/campaignUrl')

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    const newUrl = await db
        .collection("utm-url")
        .insertOne({
            campaignUrl: req.body.campaignUrl,
            user: req.body.user,
        })
    // let newCampaignUrl = new CampaignUrl({
    //     campaignUrl: req.body.campaignUrl,
    //     user: req.body.user
    // });

    // console.log(newCampaignUrl)

    // let newCampaignUrlCreated = await db.newCampaignUrl.save();

    // const newUrl = await db
    //     .collection("utm-url")
    //     .inserOne(newCampaignUrl)

    res.json(newUrl)
};

// import dbConnect from "../../../lib/dbConnect";
// import CampaignUrl from "../../../models/campaignUrl";

// console.log('This page was called correctly!')

// export default async function handler(req, res) {
//     const { method } = req

//     await dbConnect();

//     console.log(dbConnect());

//     switch (method) {
//         case 'POST':
//             try {
//                 console.log('This is a post request')
//                 const campaignUrl = await CampaignUrl.create(
//                     req.body
//                 )
//                 res.status(201).json({ success: true, data: campaignUrl })
//             } catch (error) {
//                 res.status(400).json({ success: false })
//             }
//             break
//         default:
//             res.status(400).json({ success: false })
//     }
// }