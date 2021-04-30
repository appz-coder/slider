import React from "react";
import "./carousel.css";
import { useSelector } from 'react-redux'
import {Carousel, Col,Card, Container, Row} from "react-bootstrap";

const Slider =()=>{
    const {sliders} = useSelector((state) => state.slidersList);
    return(
        <Container fluid>
            <Row>
                <Col sm={3} >
                    <Card className={"scroll_min "} >
                        {
                            sliders.map((e,i)=>{
                            return(
                            <div className={"m-3"} key={e.id}>
                                <img className={"w-100 h-100"}   src={e.img}
                                />
                            </div>
                            )
                        })}
                    </Card>

                </Col>
                <Col sm={9} bg>

                      <p> Presentation 1</p>
                    <Carousel interval={1000000000}>
                        <Carousel.Item>
                            <img
                                className="d-block car_img w-75" height={"600px"}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block car_img w-75" height={"600px"}
                                src="https://www.xmple.com/wallpaper/gray-plain-solid-color-single-one-colour-1920x1080-c-9899a6-f-24.svg"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block car_img w-75" height={"600px"}
                                src="https://www.xmple.com/wallpaper/single-one-colour-solid-color-gray-plain-1920x1080-c-757676-f-24.svg"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                </Col>
            </Row>



        </Container>)
}

export default Slider;