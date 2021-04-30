import React, {useState} from "react";
import "./About.css"
import Pop from "../../icon/pop.png"
import Popup from "./Popup/Popup";
import lock from "../../icon/lock.png"
import {Button, Image, Table} from "react-bootstrap";
import { useSelector } from 'react-redux'

const About = (props) => {
    const {Presentation} = useSelector((state) => state.presentation);
    const [popupActive, setPopupActive] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    return (<div>

        <main role="main" className="container">
            <h5 className={"mt-5"}>All Presentations</h5>
            <div className="my-3 p-3 bg-light rounded box-shadow">
                <Table  hover responsive="xl">
                    <thead>
                    <tr>
                        <th></th>
                        <td >NAME</td>
                        <td className={"w-25"}>OPENED</td>
                        <td className={"w-25"}>SIZE</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Presentation.map((e,i) =>{
                            return(
                                <tr key={e.id}>
                                    <th>
                                        <Image className="mr-2 rounded" width="32px" height="32px" src={e.presentationImg} />
                                    </th>
                                    <td>{e.presentationName}
                                        {e.private ?
                                            <Image width={"40px"} src={lock}/>:""
                                        }
                                     <div><small>  {e.formatFile}</small></div>
                                    </td>
                                    <td>{e.presentationDate}</td>
                                    <td className={"d-flex"}>
                                        {e.presentationSize}
                                        { e.private ?
                                           <> <Button className={"ml-5 h-25 pt-1 pb-1  mr-2"}
                                                      variant="outline-dark">View</Button>
                                            <Button   className={"pt-1 pb-1  h-25"} variant="outline-dark">Share</Button></>:""
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link " href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="popbtn">
                <Button variant="primary"  onClick={() => setModalShow(true)}>
                    <Image src={Pop} width={"50px"}/>
                </Button>
            </div>

        </main>
        <Popup
            show={modalShow}
            onHide={() => setModalShow(false)}
        />

    </div>)
}
export default About;
