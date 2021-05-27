import React from "react";
import "./About.css"
import Pop from "../../icon/floating button@2x.svg";
import PDF from "../../icon/PDF.jpg"
import CreatePresentation from "./CreatePres/CreatePresentation";
import lock from "../../icon/lock.png"
import {Button, Image, Table} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import SharePresentation from "./Share/SharePresentation";
import {getPresentation, presentationPrivateStateAC} from "../../redux/store/action_creator/presentationAC";
import {NavLink, Redirect, useHistory, withRouter} from "react-router-dom";
import Header from "../NavBar/Navbar";
import {fetchPresentation} from "../../redux/store/action_creator/sliderAC";
import Load from "../ Validation/Include/loading";
import Errors from "../ Validation/Include/Erorrs";
import {PublicApi} from "../api/api";

const About = (props) => {
    const history = useHistory();
    const {Presentation, error, loading, totalUsersCount, pageSize} = useSelector((state) => state.presentation);
    const {isAuth} = useSelector((state) => state.auth)
    const {isProcessed} = useSelector((state) => state.newPresentation);
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
        if(isProcessed) {
            dispatch(getPresentation(1))
        }
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


    const PrivateChanged = async(checked, key) =>{
        if(checked){
            checked = 0
        }else{
            checked = 1
        }

       await PublicApi.checkedPrivate(checked,key).then(res=>{
           dispatch(presentationPrivateStateAC(key,res.data))
       })
    }


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
                            <td></td>
                            <td className={"w-25"}>OPENED</td>
                            <td className={"w-25"}>SIZE</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Presentation.map((pres, i) => {
                                if (!pres.presentation_file.length) {
                                    return
                                }
                                return (
                                    <tr key={i} className={"control_hover"}>
                                        <th>{
                                            pres.presentation_file[0].path.endsWith('.png')
                                                ? <Image className="mr-2 rounded" width="45px" src={`${process.env.REACT_APP_API_URL}${pres.presentation_file[0].path}`}/>
                                                : <Image className="mr-2 rounded" width="45px" src={PDF}/>
                                        }
                                        </th>
                                        <td>{pres.title}
                                            {pres.is_private ?
                                                <Image className={"lock"}  src={lock}/> : ""
                                            }
                                            <div><small>  {pres.presentation_file[0].mime}</small></div>
                                        </td>
                                        <td >
                                            <div>
                                                {pres.is_private? <button
                                                    className={"click_btn"}
                                                    onClick={()=>{PrivateChanged(true,pres.secret_key)}}>
                                                        Private
                                                    </button>:
                                                    <button
                                                        className={"click_btn"}
                                                        onClick={()=>{PrivateChanged(false,pres.secret_key)}}>
                                                        Public
                                                    </button>}
                                            </div>
                                        </td>
                                        <td>{
                                            new Date(pres.createdAt).toLocaleString('en-us', {
                                                month: 'short',
                                                day: "2-digit"
                                            })
                                        }</td>
                                        <td className={"d-flex"}>
                                            {Math.round(pres.presentation_file[0].size / 1000) + '' + 'KB'}
                                            <Button onClick={() => loadPresentation(pres.secret_key)}
                                                    variant="outline-dark" className="ml-5  h-25 pt-1 pb-1 control_buttons mr-2">
                                                View
                                            </Button>
                                            <Button className={"pt-1 pb-1 control_buttons h-25"} variant="outline-dark"
                                                    onClick={() => {
                                                        ModalShow(pres.presentation_file[0].path,pres.secret_key)
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
                                <NavLink activeClassName={'active_li'} to={`/home/${p}`} className="page-link">{p}</NavLink>
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
    </div>);
}
export default withRouter(About);
