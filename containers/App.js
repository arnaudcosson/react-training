import React from 'react';
import { connect } from 'react-redux';
import Menu from '../components/Menu';
import { bindActionCreators } from 'redux';

function mapStateToProps( state )
{
    return state;
}
function mapDispatchToProps( dispatch )
{
    return bindActionCreators( {}, dispatch );
}

class App extends React.Component{
    render(){
        return (
            <div className="container">
                <Menu />
                {this.props.children}
            </div>
        )
    }
}
export default connect( mapStateToProps, mapDispatchToProps)( App );