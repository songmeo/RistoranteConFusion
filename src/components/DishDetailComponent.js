import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle  } from 'reactstrap';

class DishDetail extends Component {
	renderDish(dish) {
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
	
	renderComments(comments) {
		if(comments != null) {
			comments = comments.map((comment) => {
				return (
					<ul key={comment.id} className = "list-unstyled">
						<li>{ comment.comment }</li>
						<li>-- { comment.author }, { 
								new Intl.DateTimeFormat("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric"
								}).format(new Date(comment.date)) }
						</li>
					</ul>
				);
			});
			return(
				<Card>
					<CardBody>
						<h4>Comments</h4>
						<CardText>{ comments }</CardText>
					</CardBody>
				</Card>
			);
		}
		else
			return(
				<div></div>
			);
	}
	
	render() {
		const selectedDish = this.props.selectedDish;
		if(selectedDish != null)
			return (
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						{this.renderDish(selectedDish)}
					</div>
					<div className="col-12 col-md-5 m-1">
						{this.renderComments(selectedDish.comments)}
					</div>
				</div>
			);
		else
			return(
				<div></div>
			);
	}

}

export default DishDetail;
