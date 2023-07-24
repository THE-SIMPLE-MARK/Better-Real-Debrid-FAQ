export default function parseFAQFormatting(text) {
	// bold
	text = text.replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>")

	// italic
	text = text.replace(/\[i\](.*?)\[\/i\]/g, "<em>$1</em>")

	// underline
	text = text.replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>")

	// hyperlinks without accompanying text
	text = text.replace(
		/\[url\](.*?)\[\/url\]/g,
		'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
	)

	// hyperlinks with accompanying text
	text = text.replace(
		/\[url=(.*?)\](.*?)\[\/url\]/g,
		'<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
	)

	// auto-detect URLs and format them as hyperlinks
	text = text.replace(/(^|\s)((https?:\/\/|www\.)\S+)/gi, (match, p1, p2) => {
		const url = p2.startsWith("http") ? p2 : `http://${p2}`
		return `${p1}<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
	})

	// quotes
	text = text.replace(
		/\[quote\](.*?)\[\/quote\]/g,
		"<blockquote>$1</blockquote>"
	)

	// lists
	text = text.replace(/\[list\](.*?)\[\/list\]/g, "<ul>$1</ul>")
	text = text.replace(/\[list=1\](.*?)\[\/list\]/g, "<ol>$1</ol>")
	text = text.replace(/\[\*\](.*?)(?=\[\/list\])/g, "<li>$1</li>")

	// headers
	text = text.replace(/\[h1\](.*?)\[\/h1\]/g, "<h1>$1</h1>")
	text = text.replace(/\[h2\](.*?)\[\/h2\]/g, "<h2>$1</h2>")
	text = text.replace(/\[h3\](.*?)\[\/h3\]/g, "<h3>$1</h3>")

	// text color
	text = text.replace(
		/\[color=(#[0-9A-Fa-f]{6})\](.*?)\[\/color\]/g,
		'<span style="color: $1;">$2</span>'
	)

	// new lines
	text = text.replace(/\n/g, "<br>")

	return <div dangerouslySetInnerHTML={{ __html: text }} />
}
