import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Radio } from 'antd';
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { setComponentList } from '@/client/actions/componentList';

function Tool() {

  const dispatch = useDispatch()
  const componentList = useSelector(state => state.componentListReducer)
  const currentSelect = useSelector(state => state.currentSelectReducer)

  const [height, setHeight] = useState(currentSelect.props.height)

  const changeHeight = (e) => {
    setHeight(e.target.value)
  }

  useEffect(() => {
    setHeight(currentSelect.props.height)
  }, [currentSelect])

  const submit = () => {
    let newArr = [...componentList]
    componentList.forEach((item, index) => {
      if (item.key === currentSelect.key) {
        newArr[index] = {
          name: 'Banner',
          key: uuidv4(),
          props: {
            bannerList: [
              {
                imgUrl: 'http://qiniu.xingheaoyou.com/1.jpg',
                to: 'https://www.baidu.com'
              },
              {
                imgUrl: 'http://qiniu.xingheaoyou.com/2.jpg',
                to: 'https://www.taobao.com'
              }
            ],
            height: height
          }
        }
      }
    })
    dispatch(setComponentList(newArr))
  }

  return (
    <div>
      <Form>
        <Form.Item label="高度(px)">
          <Input placeholder="高度" onChange={changeHeight} value={height} />
        </Form.Item>
        <Form.Item label="图片URL">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={submit}>确认</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Tool