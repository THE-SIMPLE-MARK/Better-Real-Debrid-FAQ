import Head from "next/head"
import { Inter } from "next/font/google"
import {
	Box,
	Container,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Spinner,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import useFAQ from "utils/useFAQ"
import parseFAQFormatting from "utils/parseFAQFormatting"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
	const { query, setQuery, results, isLoading } = useFAQ()

	return (
		<>
			<Head>
				<title>Better Real Debrid FAQ</title>
				<meta
					name="description"
					content="A frontend for Real Debrid's FAQ page which actually shows the answers."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex
				as="main"
				w="100vw"
				h="100vh"
				p="30px"
				className={inter.className}
				bg="white"
			>
				<Container align="center" px="1rem" maxW="750px">
					<Heading>Better Real Debrid FAQ</Heading>
					<Text maxW="400px">
						A frontend for Real Debrid's FAQ page which actually shows the
						answers.
					</Text>

					<InputGroup mt="15px" mb="30px" maxW="500px">
						<InputLeftElement pointerEvents="none">
							<SearchIcon />
						</InputLeftElement>
						<Input
							disabled={isLoading}
							placeholder="Search Real Debrid FAQ..."
							value={query}
							onChange={e => setQuery(e.target.value)}
						/>
					</InputGroup>

					{isLoading ? (
						<Flex
							justifyContent="center"
							flexDir="column"
							gap="10px"
							w="fit-content"
						>
							<Spinner alignSelf="center" size="xl" />
							<Text>Loading FAQ data...</Text>
						</Flex>
					) : (
						<Accordion allowToggle>
							{results.map((result, index) => {
								// don't display empty items
								if (!result?.title || !result?.description) return null

								return (
									<AccordionItem key={index}>
										<h2>
											<AccordionButton>
												<Box as="span" flex="1" textAlign="left">
													{result.title}
												</Box>
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4} textAlign="left">
											{parseFAQFormatting(result.description)}
										</AccordionPanel>
									</AccordionItem>
								)
							})}
						</Accordion>
					)}
				</Container>
			</Flex>
		</>
	)
}
