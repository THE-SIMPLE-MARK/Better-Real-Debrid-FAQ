export default function parseFAQFormatting(text) {
	// bold
	text = text.replace(/\[b\](.*?)\[\/b\]/gi, "<strong>$1</strong>")

	// italic
	text = text.replace(/\[i\](.*?)\[\/i\]/gi, "<em>$1</em>")

	// underline
	text = text.replace(/\[u\](.*?)\[\/u\]/gi, "<u>$1</u>")

	// hyperlinks without accompanying text
	text = text.replace(
		/\[url\](.*?)\[\/url\]/gi,
		'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
	)

	// hyperlinks with accompanying text
	text = text.replace(
		/\[url=(.*?)\](.*?)\[\/url\]/gi,
		'<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
	)

	// auto-detect URLs and format them as hyperlinks
	text = text.replace(/(^|\s)((https?:\/\/|www\.)\S+)/gi, (match, p1, p2) => {
		const url = p2.startsWith("http") ? p2 : `http://${p2}`
		return `${p1}<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
	})

	// quotes
	text = text.replace(
		/\[quote\](.*?)\[\/quote\]/gi,
		"<blockquote>$1</blockquote>"
	)

	// lists
	text = text.replace(/\[list\](.*?)\[\/list\]/gi, "<ul>$1</ul>")
	text = text.replace(/\[list=1\](.*?)\[\/list\]/gi, "<ol>$1</ol>")
	text = text.replace(/\[\*\](.*?)(?=\[\/list\])/gi, "<li>$1</li>")

	// headers
	text = text.replace(/\[h1\](.*?)\[\/h1\]/gi, "<h1>$1</h1>")
	text = text.replace(/\[h2\](.*?)\[\/h2\]/gi, "<h2>$1</h2>")
	text = text.replace(/\[h3\](.*?)\[\/h3\]/gi, "<h3>$1</h3>")

	// text color
	text = text.replace(
		/\[color=(#[0-9A-Fa-f]{6})\](.*?)\[\/color\]/gi,
		'<span style="color: $1;">$2</span>'
	)

	// images
	text = text.replace(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" alt="Image">')

	// new lines
	text = text.replace(/\n/gi, "<br>")

	return <div dangerouslySetInnerHTML={{ __html: text }} />
}
