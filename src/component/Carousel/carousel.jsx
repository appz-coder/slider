import React, {useEffect} from "react";
import "./carousel.css";
import {useSelector,useDispatch} from 'react-redux'
import {Carousel, Col, Card, Container, Row, Button} from "react-bootstrap";
import Presentation from "./Presents/Presents";
import {NavLink, withRouter} from "react-router-dom";
import ArrowKeysReact from 'arrow-keys-react';
import {fetchPresentation, returnFetchPresentationStateAC} from "../../redux/store/action_creator/sliderAC";
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Load from "../../component/Validation/Include/loading";
import Errors from "../../component/Validation/Include/Erorrs";
import {fetchPublicPresentation} from "../../redux/store/action_creator/publicSliderAC";

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
    ArrowKeysReact.config({
        left: () => {setPageNumber(((pageNumber-1 === 0 ? numPages : pageNumber-1)) );
            setIndex(((index-1 === -1 ? showPresentation.length-1  : index-1)));
        },
        right: () => {setPageNumber(pageNumber%numPages +1 );
            setIndex((index +1)%(showPresentation.length))},
        up: () => {
            setPageNumber(((pageNumber-1 === 0 ? numPages : pageNumber-1)) );
                setIndex(((index-1 === -1 ? showPresentation.length-1  : index-1)));
        },
        down: () => {
            setPageNumber(pageNumber%numPages +1 );
            setIndex((index +1)%(showPresentation.length));
        }});
    const loadPresentation = async () => {
        if(isAuth) {
            await dispatch(fetchPresentation(secretKey))
        }
        if(!isAuth){
            await dispatch(fetchPublicPresentation(secretKey))
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
        setPageNumber(i%numPages+1)
    };
    const stateReturn = async () => {
        await dispatch(returnFetchPresentationStateAC())
        setModalShow(true)
    }

    if (loading) return <Load/>
    if (error) return <Errors error={error}/>

    return (
        <Container fluid {...ArrowKeysReact.events} tabIndex="1">
            <Row>
                <Col sm={3} className={"p-0"}>
                    <Card className={"scroll_min "}>
                        <div>
                            {
                                showPresentation.map((pres, i) => {

                                    return (
                                        <div key={i}>
                                            {
                                                pres.mime.endsWith('pdf')?(<div>
                                                    <Document className={"pdf_sld"}
                                                              file={`${process.env.REACT_APP_API_URL}${pres.path}`}
                                                              options={{ workerSrc: `${process.env.REACT_APP_API_URL}${pres.path}` }}
                                                              onLoadSuccess={onDocumentLoadSuccess}
                                                              onLoadError={(error) => console.log('Error while loading document! ' + error.message, error)}
                                                              loading={(<div className={"pdf_load"}><div><Load /></div></div>)}>
                                                        {
                                                            Array.from(
                                                                new Array(numPages),
                                                                (el, i) => (
                                                                    <div className={pageNumber === i+1 ? "m-4 active_scroll" : "m-4"}
                                                                          onClick={(e)=>{indexSelect(i)}}
                                                                    >
                                                                    <Page
                                                                        key={`page_${i + 1}`}
                                                                        pageNumber={i+1}
                                                                    />
                                                                    </div>
                                                                ),
                                                            )
                                                        }
                                                    </Document>
                                                    <p>Page {pageNumber} of {numPages}</p>
                                                </div>):( <div className={index === i ? "m-4 active_scroll" : "m-4"} key={i}
                                                               onClick={(e) => {indexSelect(i)}}>

                                                    <img width={"100%"} height={"250px"}  src={`${process.env.REACT_APP_API_URL}${pres.path}`}
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
                <Col sm={9} className={"p-0"} >
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
                                      onSelect={handleSelect} className={"car_pdf"} >

                                {

                                    Array.from(
                                        new Array(numPages),
                                        (el, index) => (
                                            <Carousel.Item key={index}></Carousel.Item>
                                        ),
                                    )
                                }
                                                        <Document style={{margin:"auto"}}
                                                                  file={`${process.env.REACT_APP_API_URL}${showPresentation[0].path}`}
                                                                  options={{ cMapUrl: 'cmaps/', cMapPacked: true}}
                                                                  onLoadSuccess={onDocumentLoadSuccess}
                                                                  loading={(<div className={"pdf_load"}><div><Load /></div></div>)} >

                                                            <Page pageNumber={pageNumber} />
                                                        </Document>

                                                        <p>Page {pageNumber} of {numPages}</p>



                            </Carousel>
                               :<Carousel interval={null} nextIcon={nextIcon} prevIcon={prevIcon} activeIndex={index}
                                onSelect={handleSelect}>
                            {
                                showPresentation.map((presSow, i) => {

                                return (
                                <Carousel.Item key={i} className={"item_img"}>
                                    <div className={"present_img"}
                                         style={{backgroundImage:`url(${process.env.REACT_APP_API_URL}${presSow.path})`}}>
                                    </div>
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

            <Presentation show={modalShow} presentitem={showPresentation}
                          index={index} setIndex={setIndex} pagenumber={pageNumber}
                          numpages={numPages}
                          setPageNumber={setPageNumber}
                          onDocumentLoadSuccess={onDocumentLoadSuccess}
                          onHide={() => setModalShow(false)}/>


        </Container>)
}

export default withRouter(Slider);
