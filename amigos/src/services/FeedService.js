import { EventModel } from "../db/models/index";
import FilteringBuilder from "./FilteringBuilder";

export default class FeedService {
	static async getFeedList(userID, filterData, {limit, page}) {
		const filterOBJ = new FilteringBuilder()
			.addFeedFilterEvent("category", filterData.category)
			.addFeedFilterEvent("peopleWanted", filterData.peopleWanted)
			.addFeedFilterEvent("city", filterData.city)
			.addFeedFilterEvent("dateStart", filterData.dateStart)
			.addFeedFilterUser('languages', filterData.languages)
			.addFeedFilterUser('yearOfBirth', {
				$lte: new Date().getFullYear() - filterData.minAge,
				$gte: new Date().getFullYear() - filterData.maxAge,
			})

		const data = await EventModel.paginate({
			author: { 
				$ne: `${userID}`
			},
			...filterOBJ.eventFilter,
			// category: filterData.category,
			// peopleWanted: filterData.peopleWanted,
			// dateStart: filterData.dateStart,
			// address: filterData.address,
		}, {
			sort: "-createDate",
			limit,
			select: ["-__v"],
			page,
			populate: [
				{
					path: "author",
					match: {
						...filterOBJ.userFilter
						// languages: filterData.languages || languages,
						// birthday: {
						// 	$lte: maxDate.toISOString(),
						// 	$gte: minDate.toISOString(),
						// },
					},
					// ? -events
					select: ["-password", "-__v", '-events'],
				},
				{
					path: "category",
					select: ["-__v"],
				}
			],
		});
		return {...data, docs: data.docs.filter(item => item.author !== null)}
	}
}