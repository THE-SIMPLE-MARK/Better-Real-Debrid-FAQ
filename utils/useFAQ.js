import { useEffect, useState } from "react"

export default function useFAQ() {
	const [query, setQuery] = useState("")
	const [answers, setAnswers] = useState([])
	const [results, setResults] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getAnswers(setAnswers, setIsLoading, answers, query, setResults)
	}, [])

	useEffect(() => {
		filterAnswers(answers, query, setResults)
	}, [query, answers])

	return {
		query,
		setQuery,
		results,
		isLoading,
	}
}

async function getAnswers(setAnswers, setIsLoading) {
	// get the amount of keywords
	const keywordsResponse = await fetch(
		"https://api.real-debrid.com/rest/1.0/support/getKeywords/en",
		{ method: "GET" }
	)
	console.log("keyword request")

	if (!keywordsResponse.ok)
		return alert(
			"Real Debrid failed to response with the expected data. The service may be down or you may have been rate limited."
		)

	const keywordsData = await keywordsResponse.json()
	const keywordsCount = Object.keys(keywordsData).length

	// fetch the answers to each keyword
	for (let i = 1; i < keywordsCount; i++) {
		const answerResponse = await fetch(
			`https://api.real-debrid.com/rest/1.0/support/getAnswer/en/${i}`
		)
		console.log("answer request")

		if (!answerResponse.ok)
			return alert(
				"Real Debrid failed to response with the expected data. The service may be down or you may have been rate limited."
			)

		const answerData = await answerResponse.json()

		await setAnswers(answers => [
			...answers,
			{
				title: answerData.title,
				description: answerData.answer,
			},
		])
	}

	await setIsLoading(false)
}

async function filterAnswers(answers, query, setResults) {
	const filteredAnswers = answers.filter(answer => {
		const sanitizedQuery = removeSpecialCharacters(query)
		const sanitizedTitle = removeSpecialCharacters(answer.title)
		const sanitizedDescription = removeSpecialCharacters(answer.description)

		return (
			sanitizedTitle.includes(sanitizedQuery) ||
			sanitizedDescription.includes(sanitizedQuery)
		)
	})

	// display filtered results when the query is at a notable length (currently 2 chars)
	// otherwise display all the entries
	if (query.length >= 2) await setResults(filteredAnswers)
	else await setResults(answers)
}

function removeSpecialCharacters(string) {
	// account for non-strings
	if (typeof string !== "string") return ""

	return string
		.toLowerCase()
		.normalize("NFD") // normalize accented characters
		.replace(/[\u0300-\u036f]/g, "") // remove accents
		.replace(/\s/g, "") // remove spaces
}
