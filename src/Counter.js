
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.incrementAsync = this.incrementAsync.bind(this);
        this.incrementIfOdd = this.incrementIfOdd.bind(this);
    }

    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            this.props.onIncrement()
        }
    }

    incrementAsync() {
        setTimeout(this.props.onIncrement, 1000)
    }

    render() {
        const { value, onIncrement, onDecrement } = this.props
        return (
            <p>
                Clicked: {value} times
          {' '}
                <button onClick={onIncrement}>
                    +
          </button>
                {' '}
                <button onClick={onDecrement}>
                    -
          </button>
                {' '}
                <button onClick={this.incrementIfOdd}>
                    Increment if odd
          </button>
                {' '}
                <button onClick={this.incrementAsync}>
                    Increment async
          </button>
            </p>
        )
    }
}
//  通过isRequired检测props中某个必要的属性（如果该属性不存在就报错）
Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

export default Counter