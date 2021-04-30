import React from "react";
import "./carousel.css";
import {useSelector} from 'react-redux'
import {Carousel, Col, Card, Container, Row, Button} from "react-bootstrap";
import Presentation from "./Presents/Presents";
import Private from "./Presents/Private/Private";

const nextIcon = <div className="custom-chevron-right"></div>;
const prevIcon = <div className="custom-chevron-left"></div>;


const Slider = () => {
    const {sliders} = useSelector((state) => state.slidersList);
    const [modalShow, setModalShow] = React.useState(false);
    const [privateShow, setPrivateShow] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const indexSelect = (i, e) => {
        setIndex(i);
        setPrivateShow(true)
    };
    return (
        <Container fluid>
            <Row>
                <Col sm={3} className={"p-0"}>
                    <Card className={"scroll_min "}>
                        <div>
                            {
                                sliders.map((e, i) => {
                                    return (
                                        <div className={index === i ? "m-4 active_scroll" : "m-4"} key={e.id}
                                             onClick={(e) => {indexSelect(i)}}>

                                            <img className={"w-100 h-100"} src={e.img}
                                            />
                                        </div>
                                    )
                                })}
                        </div>
                    </Card>

                </Col>
                <Col sm={9} className={"p-0"} bg>
                    <Card className={"slide_card"}>
                        <Card.Body>
                            <Card.Title className={" ml-5"}>
                                Presentation 1
                                <Button className={"camera_btn "} variant="link" onClick={() => setModalShow(true)}>
                                    <i className="fas  fa-camera"></i>
                                </Button>
                            </Card.Title>
                            <Carousel interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={index}
                                      onSelect={handleSelect}>
                                {
                                    sliders.map((e, i) => {
                                        return (
                                            <Carousel.Item key={e.id}>
                                                <img
                                                    className="car_img"
                                                    src={e.img}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                        )
                                    })
                                }
                            </Carousel>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Presentation show={modalShow} presentItem={sliders} index={index} setIndex={setIndex}
                          onHide={() => setModalShow(false)}/>
                          {/*<Private  show={privateShow}*/}
                          {/*          onHide={() => setPrivateShow(false)}/>*/}

        </Container>)
}

export default Slider;