import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAnimalsAction, logoutAction } from '../../redux/action';
import "./index.css"

class Animals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        }
    }

    componentDidMount() {
        this.props.getAnimals(1);
    }

    nextPage = () => {
        if (this.state.page !== this.props.pageTotal) {
            this.props.getAnimals(this.state.page + 1)
            this.setState({ page: this.state.page + 1 })
        };
    }

    prePage = () => {
        if (this.state.page !== 1) {
            this.props.getAnimals(this.state.page - 1)
            this.setState({ page: this.state.page - 1 })
        };
    }

    setPage = (number) => {
        this.props.getAnimals(number)
        this.setState({ page: number });
    }

    setPageInput = (event) => {
        if (event.key == "Enter" && event.target.value > 0 && event.target.value < this.props.pageTotal) {
            this.props.getAnimals(event.target.value)
            this.setState({ page: Number.parseInt(event.target.value) });
        }
    }

    render() {
        return this.props.loading ? <div className="loading"><img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" /></div> : (
            <div className="body">
                <div className="logout"><img  onClick={()=> this.props.logout()} src="https://cdn.icon-icons.com/icons2/2518/PNG/512/logout_icon_151219.png" width="30px"/></div>
                <div className="content">
                    <h3>Animals</h3> 
                    <div className="list-animals">
                        {
                            this.props.animals.length > 0 ? this.props.animals.map(val => (<div className="animal" key={val.id}>
                                <img className="photo" src={val.photos[0]?.medium || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXd3d2amprg4OCXl5e9vb2UlJTFxcWnp6efn5/S0tLW1tavr6/IyMjPz8+srKy3t7cOBfakAAADkUlEQVR4nO2c23aDIBAAFcRbkub//7ZJ2ygqqDHIrTPPxnWOZt1FoCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdiF841uvqyu/1J1PSVG3SvpGtbU3RfGlyhCoL0+K4ksGESxL6UdR1GHu4BPl5UEVbTDBsmx9GHbhbuHjJnbnC4o61L/wifTwmIpKM/T0otACVl4NZevpbd/KMIby7q1iu8sghl7y2l/QNoShj2BD0LvHoGEMfQbFMP2gGH54dnMzn4uhEN21qq6GZj4PQ3G7/FWB5eU2O3UOhqJv1FibqaafnDwDw0fHMmlZ5LSJSN9QVIumU+mnT97QODCij1gkb9gbm2rZnxrUygnBRGM2bIYAqRveLCM/6nZiUDvug4mLZeRHXl4RUjc0+z3JxLCzDt7J19hh2obiaje8ipOCrl6Qc8PKblhheAY8pe+Tfab5B2+L/N/4+Vdt/6DyTrx72jPdJ+UOWBRVq1Sz9eU23VEM0ZU/R6tm68BUR6KGP5iWNSynTXQ0cZyYsj3ZJ8UR4clbYHx9249PbVR/VqvI+57MlNKXmUV+VHsUPwzqgr3BxLIWU4cvL0pDU51yeOJdlIZLv6fi9dgFRmhoKaZLOX8PuAzqiF3BxklMC8X+yCVGZ2goM0d64y+28nJchoY0qmP6QXVf/YfGZmhu94bntJ2fsXiUpHK1OI/NcGOa9KwKf/UfC/P3grpjM5gtjVoUx+HSlf4jKkN7GtUUxypcT0p2xZgM961VGBTFRT/c2mJFZChu23fwT1H85Jjp4bb+IyLD9TSqu7R1193l/HBL/xGR4RurTaaT8AdF87Mfi6GLFVHG/iMWwz1pdIeiobqJxNDVki+17D/iMBT274Bvsmyx4jA097zHFOctVhyGThft9TuDejR0vLC03RXUp+HKhIpDzBqN8Ibi6nrZ5bQKD27oLo1aFIMbOkyjmqLWaIQ23O55jynqXWRQQ+tskY8Vh0YjrOHq0OFnDI1GUEP3aVRXrIUxqE9DsbvnPab422gEvYdn+pWvRiOg4UlpVEN2IqThaWlUV3w0GsEMT0yjOn04wzPTqE4ww3PT6IhsQxl626hGNkEMS093cBLLr2EIMMQQQwwxxBBDDDHEEMNsDLPf+zL//Uv/wR60+e8jnP9e0EX++3kX+e/JXuS/r/6vpGf86gEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEC6fAP2rj9/Wdk3nwAAAABJRU5ErkJggg=="} />
                                <div className="name-animal"><span className="species">{val.species}</span><span className="name">{val.name}</span></div>
                            </div>)) : <h5>Không có dữ liệu</h5>
                        }
                    </div>
                    {this.props.pageTotal>0 && (<div className="pagination">
                        <ul>
                            <li onClick={() => this.prePage()}><i className="fa fa-angle-left" aria-hidden="true"></i></li>
                            <li className={this.state.page == 1 ? "page-active":""} onClick={() => this.setPage(1)}>1</li>
                            <li className={this.state.page == 2 ? "page-active":""} onClick={() => this.setPage(2)}>2</li>
                            {this.state.page == 3 && <li className="page-active" onClick={() => this.setPage(3)}>3</li>}
                            {(this.state.page > 3 && this.state.page < this.props.pageTotal - 2) && (
                                <><li>...</li>
                                    <li onClick={() => this.prePage()}>{this.state.page - 1}</li>
                                    <li className="page-active" onClick={() => this.setPage(this.state.page)}>{this.state.page}</li>
                                    <li onClick={() => this.nextPage()}>{this.state.page + 1}</li>
                                </>
                            )}
                            {
                                this.props.pageTotal > 6 && (<>
                                    <li>...</li>
                                    {this.state.page == this.props.pageTotal - 2 && (<li className="page-active">{this.props.pageTotal - 2}</li>)}
                                    <li className={this.state.page == this.props.pageTotal - 1 ? "page-active":""} onClick={() => this.setPage(this.props.pageTotal - 1)}>{this.props.pageTotal - 1}</li>
                                    <li className={this.state.page == this.props.pageTotal ? "page-active":""} onClick={() => this.setPage(this.props.pageTotal)}>{this.props.pageTotal}</li>
                                    <li onClick={() => this.nextPage()}><i className="fa fa-angle-right" aria-hidden="true"></i></li>
                                </>)
                            }
                            <li><input className="input-page" placeholder="page" type="number" onKeyPress={(event) => this.setPageInput(event)} /></li>
                        </ul>
                    </div>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        loading: state?.loading,
        animals: state?.animals,
        pageTotal: state?.pageTotal
    })
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAnimals: (page) => dispatch(getAnimalsAction(page)),
        logout : () => dispatch(logoutAction())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Animals);