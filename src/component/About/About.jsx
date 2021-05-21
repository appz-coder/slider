import React from "react";
import "./About.css"
import Pop from "../../icon/floating button@2x.svg";
import FILE from "../../icon/file.webp"
import CreatePresentation from "./CreatePres/CreatePresentation";
import lock from "../../icon/lock.png"
import {Button, Image, Table} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import SharePresentation from "./Share/SharePresentation";
import {getPresentation} from "../../redux/store/action_creator/presentationAC";
import {NavLink, Redirect, useHistory, withRouter} from "react-router-dom";
import Header from "../NavBar/Navbar";
import {fetchPresentation} from "../../redux/store/action_creator/sliderAC";
import Load from "../ Validation/Include/loading";
import Errors from "../ Validation/Include/Erorrs";

const About = (props) => {
    const history = useHistory();
    const {Presentation, error, loading, totalUsersCount, pageSize} = useSelector((state) => state.presentation);
    const {isAuth} = useSelector((state) => state.auth)
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShare, setModalShare] = React.useState(false);
    const [path, setPath] = React.useState('');
    const [secretKey, setSecretKey] = React.useState('');
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getPresentation(1))
    }, []);
    const onHide = () => {
        setModalShow(false)
        dispatch(getPresentation(1))
    }
    const ModalShow = (path,secKey) => {
        setModalShare(true)
        setPath(path)
        setSecretKey(secKey)
    }
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const loadPresentation = async (presentationUuid) => {
        await dispatch(fetchPresentation(presentationUuid))
        history.push("/w/" + presentationUuid)
    }
    if (loading) return <Load/>
    if (error) return <Errors error={error}/>
    if (!isAuth) return <Redirect to={'/'}/>

    return (<div>
        <Header/>
        <main role="main" className="container">
            {totalUsersCount ? <div><h5 className={"mt-5"}>All Presentations</h5>
                <div className="my-3 p-3  pres_table rounded box-shadow">
                    <Table hover responsive="xl">
                        <thead>
                        <tr>
                            <th></th>
                            <td>NAME</td>
                            <td className={"w-25"}>OPENED</td>
                            <td className={"w-25"}>SIZE</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Presentation.map((e, i) => {
                                if (!e.presentation_file.length) {
                                    return
                                }
                                return (
                                    <tr key={e.id} className={"control_hover"}>
                                        <th>{
                                            e.presentation_file[0].path.endsWith('.png')
                                                ? <Image className="mr-2 rounded" width="45px" src={`${process.env.REACT_APP_API_URL}${e.presentation_file[0].path}`}/>
                                                : <Image className="mr-2 rounded" width="45px" src={FILE}/>
                                        }
                                        </th>
                                        <td>{e.title}
                                            {e.is_private ?
                                                <Image width={"40px"} src={lock}/> : ""
                                            }
                                            <div><small>  {e.presentation_file[0].mime}</small></div>
                                        </td>
                                        <td>{
                                            new Date(e.createdAt).toLocaleString('en-us', {
                                                month: 'short',
                                                day: "2-digit"
                                            })
                                        }</td>
                                        <td className={"d-flex"}>
                                            {Math.round(e.presentation_file[0].size / 1000) + '' + 'KB'}
                                            <Button onClick={() => loadPresentation(e.secret_key)}
                                                    variant="outline-dark"
                                                    className="ml-5  h-25 pt-1 pb-1 control_buttons mr-2">
                                                {/*<NavLink to={"/w/"+e.secret_key}  style={{textDecoration: 'none',color:'grey'}} > View</NavLink>*/}
                                                View
                                            </Button>
                                            <Button className={"pt-1 pb-1 control_buttons h-25"} variant="outline-dark"
                                                    onClick={() => {
                                                        ModalShow(e.presentation_file[0].path,e.secret_key)
                                                    }}>Share</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            </div> : <h5 className={"mt-5"}>You do not have any presentations yet</h5>}
            {totalUsersCount > 10 && (<nav aria-label="Page navigation example">
                <ul className="pagination">
                    {
                        pages.map((p, i) =>
                            <li className="page-item" key={i} onClick={() => {dispatch(getPresentation(p))}}
                        >
                                <NavLink activeClassName={'active_li'} to={`/about/${p}`} className="page-link">{p}</NavLink>
                        </li>)
                    }
                </ul>
            </nav>)}
            <div className="popbtn" onClick={() => setModalShow(true)}>
                <Image src={Pop}/>
            </div>

        </main>
        <CreatePresentation
            show={modalShow}
            onHide={onHide}/>
        <SharePresentation
            show={modalShare} path={path} secretKey={secretKey}
            onHide={() => setModalShare(false)}/>

    </div>)
}
export default withRouter(About);
