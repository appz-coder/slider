import React, {useEffect} from "react";
import "./carousel.css";
import {useSelector,useDispatch} from 'react-redux'
import {Carousel, Col, Card, Container, Row, Button} from "react-bootstrap";
import Presentation from "./Presents/Presents";
import {NavLink, withRouter} from "react-router-dom";
import {fetchPresentation, returnFetchPresentationStateAC} from "../../redux/store/action_creator/sliderAC";
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Load from "../ Validation/Include/loading";
import Errors from "../ Validation/Include/Erorrs";

const nextIcon = <div className="custom-chevron-right"></div>;
const prevIcon = <div className="custom-chevron-left"></div>;


const Slider = ({ match }) => {
    let {showPresentation,title, loading, error} = useSelector((state) => state.showPresentation);
    const {isAuth} = useSelector((state) => state.auth)
    const [modalShow, setModalShow] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const dispatch = useDispatch();
    const [numPages, setNumPages] = React.useState("");
    const [pageNumber, setPageNumber] = React.useState(1);

    const secretKey = match.params.secret_key;

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      loadPresentation()
    }, [])

    const loadPresentation = async () => {
        if(isAuth) {
            await dispatch(fetchPresentation(secretKey))
        }
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setPageNumber(selectedIndex%numPages+1);
    };

    const indexSelect = (i, e) => {
        setIndex(i);
    };
    const stateReturn = async () => {
        await dispatch(returnFetchPresentationStateAC())
        setModalShow(true)
    }

    if (loading) return <Load/>
    if (error) return <Errors error={error}/>

    return (
        <Container fluid>
            <Row>
                <Col sm={3} className={"p-0"}>
                    <Card className={"scroll_min "}>
                        <div>
                            {
                                showPresentation.map((e, i) => {

                                    return (
                                        <div>
                                            {
                                                e.mime.endsWith('pdf')?(<div>
                                                    <Document className={"pdf_sld"}
                                                              file={`${process.env.REACT_APP_API_URL}${e.path}`}
                                                              options={{ workerSrc: `${process.env.REACT_APP_API_URL}${e.path}` }}
                                                              onLoadSuccess={onDocumentLoadSuccess}
                                                              onLoadError={(error) => console.log('Error while loading document! ' + error.message, error)}
                                                    >
                                                        {
                                                            Array.from(
                                                                new Array(numPages),
                                                                (el, index) => (
                                                                    <Page
                                                                        key={`page_${index + 1}`}
                                                                        pageNumber={index + 1}
                                                                    />
                                                                ),
                                                            )
                                                        }
                                                    </Document>
                                                    <p>Page {pageNumber} of {numPages}</p>
                                                </div>):( <div className={index === i ? "m-4 active_scroll" : "m-4"} key={e.id}
                                                               onClick={(e) => {indexSelect(i)}}>

                                                    <img className={"w-100 "}  src={`${process.env.REACT_APP_API_URL}${e.path}`}
                                                    />
                                                </div>)
                                            }


                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Card>

                </Col>
                <Col sm={9} className={"p-0"} bg>
                    <Card className={"slide_card"}>
                        <Card.Body>
                            <Card.Title className={" ml-5"}>
                                {title}
                                <NavLink to={"/home"} style={{color:"#e2d27b"}} >
                                    <i className="fas fa-exchange-alt ml-4" onClick={stateReturn}></i>
                                </NavLink>
                                <Button className={"camera_btn "} variant="link" onClick={() => setModalShow(true)}>
                                    <i className="fas  fa-camera"></i>
                                </Button>
                            </Card.Title>


                            {
                                showPresentation.length &&
                                showPresentation[0].mime.endsWith('pdf')?
                                <Carousel interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={index}
                                      onSelect={handleSelect}>

                                {

                                    Array.from(
                                        new Array(numPages),
                                        (el, index) => (
                                            <Carousel.Item key={index}></Carousel.Item>
                                        ),
                                    )
                                }
                                                        <Document
                                                                  file={`${process.env.REACT_APP_API_URL}${showPresentation[0].path}`}
                                                                  options={{ cMapUrl: 'cmaps/', cMapPacked: true}}
                                                                  onLoadSuccess={onDocumentLoadSuccess}
                                                        >

                                                            <Page pageNumber={pageNumber} />
                                                        </Document>

                                                        <p>Page {pageNumber} of {numPages}</p>



                            </Carousel>
                               :<Carousel interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={index}
                                onSelect={handleSelect}>
                            {
                                showPresentation.map((e, i) => {

                                return (
                                <Carousel.Item key={e.id}>

                                <img className="car_img"
                                src={`${process.env.REACT_APP_API_URL}${e.path}`}
                                alt="First slide"/>

                                </Carousel.Item>
                                )
                            })
                            }
                                </Carousel>
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Presentation show={modalShow} presentItem={showPresentation}
                          index={index} setIndex={setIndex} pageNumber={pageNumber}
                          numPages={numPages}
                          setPageNumber={setPageNumber}
                          onDocumentLoadSuccess={onDocumentLoadSuccess}
                          onHide={() => setModalShow(false)}/>


        </Container>)
}

export default withRouter(Slider);