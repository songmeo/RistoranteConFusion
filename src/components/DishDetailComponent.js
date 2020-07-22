import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Nav, NavItem, Modal, ModalHeader, ModalBody, Label, Button, Row, Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    };

    toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		})
	}
	
	handleSubmit(values) {
		this.props.addComment(this.props.dishID, values.rating, values.author, values.comment );
		this.toggleModal();
	}
	
    render() {
        return (
            <>
            <Nav className="ml-auto" >
                <NavItem>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-edit fa-lg"></span> Submit Comment
                    </Button>
                </NavItem>
            </Nav>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
							<Col md={12}>
								<Label htmlFor="name">Your Name</Label>
                            	<Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your Name" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
								<Errors className="text-danger" model=".name" show="touched" messages={{required: 'Required', minLength: 'Must be greater than 2 chars', maxLength: 'Must be 15 chars or less'}}></Errors>
							</Col>
                        </Row>
						<Row className="form-group">
							<Col md={12}>
								<Label htmlFor="rating">Rating</Label>
								<Control.select model=".rating" id="rating" name="rating" className="form-control" >
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>
							</Col>
                        </Row>
						<Row className="form-group">
							<Col md={12}>
								<Label htmlFor="comment">Comment</Label>
								<Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
							</Col>
                        </Row>
                        <Row className="form-group">
							<Col md={12}>
								<Button type="submit" color="primary">Submit</Button>
							</Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }
}

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

function RenderComments({ comments, addComment, dishID }) {
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
			<>
				<h4>Comments</h4>
				{ comments }
				<CommentForm dishID={dishID} addComment={addComment} />
			</>
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
					<Breadcrumb>
						<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.selectedDish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.selectedDish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={props.comments} 
							addComment={props.addComment}
							dishID={props.selectedDish.id} 
						/>
					</div>
				</div>
			</div>
		);
	else
		return(
			<div></div>
		);
}


export default DishDetail;
