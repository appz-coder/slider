import React from "react";
import "./Presents.css"
import {Carousel, Modal} from "react-bootstrap";
import {Document, Page} from "react-pdf/dist/umd/entry.webpack";

const nextIcon = <div className="custom-chevron-right"></div>;
const prevIcon = <i className="custom-chevron-left"></i>;

const Presentation = (props) => {
    const handleSelect = (selectedIndex, e) => {
        props.setIndex(selectedIndex);
        props.setPageNumber(selectedIndex % props.numPages + 1);

    };
debugger
    return (<Modal
            className={"PRES"}
            {...props}
            size="lg"
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header className="p-0 border-0" closeButton>
            </Modal.Header>
            <Modal.Body className={"w-100 "}>
                {
                    props.presentItem[0].mime.endsWith('pdf') ?
                        <Carousel interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={props.index}
                                  onSelect={handleSelect}>

                            {

                                Array.from(
                                    new Array(props.numPages),
                                    (el, index) => (
                                        <Carousel.Item key={index}></Carousel.Item>
                                    ),
                                )
                            }
                            <Document
                                file={`${process.env.REACT_APP_API_URL}${props.presentItem[0].path}`}
                                options={{cMapUrl: 'cmaps/', cMapPacked: true}}
                                onLoadSuccess={props.onDocumentLoadSuccess}
                            >

                                <Page pageNumber={props.pageNumber}/>
                            </Document>

                            <p>Page {props.pageNumber} of {props.numPages}</p>


                        </Carousel>
                        : <Carousel interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={props.index}
                                    onSelect={handleSelect}>
                            {
                                props.presentItem.map((e, i) => {
                                    return (
                                        <Carousel.Item key={e.id}>
                                            <img
                                                className="pres_carousel"
                                                src={`${process.env.REACT_APP_API_URL}${e.path}`}
                                                alt="Your presentation"
                                            />
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>
                }

            </Modal.Body>
        </Modal>
    )
}

export default Presentation;