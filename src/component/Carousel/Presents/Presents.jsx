import React from "react";
import "./Presents.css"
import {Card, Carousel, Image, Modal} from "react-bootstrap";
const nextIcon = <div className="custom-chevron-right"></div>;
const prevIcon = <i className="custom-chevron-left"></i>;

const Presentation =(props)=>{

    const handleSelect = (selectedIndex, e) => {
        props.setIndex(selectedIndex);
        console.log(selectedIndex)
    };

    return(      <Modal
            className={"PRES"}
            {...props}
            size="lg"
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header className="p-0 border-0" closeButton>
            </Modal.Header>
            <Modal.Body className={"w-100 "}>
                <Carousel  interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={props.index} onSelect={handleSelect}>
                    {
                        props.presentItem.map((e,i)=>{
                            return(
                                <Carousel.Item key={e.id}>
                                    <img
                                        className="pres_carousel"
                                        src={e.img}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </Modal.Body>
        </Modal>
    )
}

export default Presentation;