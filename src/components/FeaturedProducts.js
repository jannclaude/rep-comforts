import { useState, useEffect, useContext} from 'react';
import { CardGroup } from 'react-bootstrap'
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts(){


	const [previews, setPreviews] = useState([])

	useEffect(() => {
		fetch(`${ process.env.REACT_APP_API_URL }/products/active`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			const numbers = []
			const featured= []

			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.length)
				if(numbers.indexOf(randomNum) === -1 ){
					numbers.push(randomNum)
				}else{
					generateRandomNums()
				}
			}

			for(let i = 0; i < 4; i++){
				generateRandomNums()
				console.log("This is data.id", data)
				featured.push(
					<PreviewProducts data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2}/>
				)
			}

			setPreviews(featured)
		})
	}, [])

	return(
		<>
			<h2 className="text-center mb-4"><strong>Featured Products</strong></h2>
			<CardGroup className="ms-5 me-5 justify-content-center">
					{previews}
			</CardGroup>
		</>
	)
}