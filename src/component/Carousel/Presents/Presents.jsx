import React from "react";
import "./Presents.css"
import {Carousel, Modal} from "react-bootstrap";
import {Document, Page} from "react-pdf/dist/umd/entry.webpack";
import Load from "../../../component/Validation/Include/loading";

const nextIcon = <div className="custom-chevron-right"></div>;
const prevIcon = <i className="custom-chevron-left"></i>;

const Presentation = (props) => {
    const handleSelect = (selectedIndex, e) => {
        props.setIndex(selectedIndex);
        props.setPageNumber(selectedIndex % props.numpages + 1);

    };
    return (<Modal  animation={false}
            className={"PRES"}
            {...props}
            size="lg"
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header className="p-0 border-0" closeButton></Modal.Header>
            <Modal.Body className={"w-100"}>
                {
                    props.presentitem[0].mime.endsWith('pdf') ?
                        <Carousel interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={props.index}
                                  onSelect={handleSelect} className={"card_pdf"}  slide={false} fade={false} >

                            {

                                Array.from(
                                    new Array(props.numpages),
                                    (el, index) => (
                                        <Carousel.Item key={index}></Carousel.Item>
                                    ),
                                )
                            }
                            <Document
                                file={`${process.env.REACT_APP_API_URL}${props.presentitem[0].path}`}
                                options={{cMapUrl: 'cmaps/', cMapPacked: true}}
                                onLoadSuccess={props.onDocumentLoadSuccess}
                                 loading={(<div className={"pdf_load"}><div><Load /></div></div>)}>

                                <Page pageNumber={props.pagenumber}/>
                            </Document>

                            <p>Page {props.pagenumber} of {props.numpages}</p>


                        </Carousel>
                        : <Carousel interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={props.index}
                                    onSelect={handleSelect}  slide={false} fade={false}>
                            {
                                props.presentitem.map((e, i) => {
                                    return (
                                        <Carousel.Item key={e.id}>
                                            <div
                                                className="pres_carousel"
                                                style={{backgroundImage:`url(${process.env.REACT_APP_API_URL}${e.path})`}}
                                            ></div>
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
