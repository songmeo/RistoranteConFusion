import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle  } from 'reactstrap';

	function RenderDish({ dish }) {
		return(
			<Card>
				<CardImg top src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	}
	
	function RenderComments({ comments }) {
		if(comments != null) {
			comments = comments.map((comment) => {
				return (
					<ul key={comment.id} className = "list-unstyled">
						<li>{ comment.comment }</li>
						<li>-- { comment.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
					</ul>
				);
			});
			return(
					<div className="col-12 col-md-5 m-1">
						<h4>Comments</h4>
						{ comments }
					</div>
			);
		}
		else
			return(
				<div></div>
			);
	}
	
	const DishDetail = (props) => {
		const selectedDish = props.selectedDish;
		if(selectedDish != null)
			return (
				<div class="container">
					<div className="row">
						<div className="col-12 col-md-5 m-1">
							<RenderDish dish={props.selectedDish} />
						</div>
						<RenderComments comments={props.selectedDish.comments} />
					</div>
				</div>
			);
		else
			return(
				<div></div>
			);
	}


export default DishDetail;
