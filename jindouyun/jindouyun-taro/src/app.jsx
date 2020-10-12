import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './store'
import './app.scss'
import './assets/styles/layouts.scss'
import './assets/styles/box.scss'
import './assets/styles/colors.scss'
//import './assets/styles/coverDefault.scss'
import './assets/styles/animations.scss'


const store = configStore()

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
