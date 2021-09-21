import clientPromise from '../../../lib/mongodb'
// import CampaignUrl from '../../../models/campaignUrl';
// const CampaignUrl = require('../../../models/campaignUrl')

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    const newName = await db
        .collection("campaignName")
        .insertOne({
            campaignName: req.body.parameter,
            user: req.body.user,
        })

    res.json(newName)
};