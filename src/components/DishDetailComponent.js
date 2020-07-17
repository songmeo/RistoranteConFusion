import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle  } from 'reactstrap';
import moment from 'moment'

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
	
	render() {
		const selectedDish = this.props.selectedDish;
		if(selectedDish != null)
			return (
				<div class="container">
					<div className="row">
						<div className="col-12 col-md-5 m-1">
							{this.renderDish(selectedDish)}
						</div>
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
