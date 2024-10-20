import React, { useEffect, useState } from 'react'
import { Form, Input, message, Modal, Select, Table, DatePicker } from 'antd'
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Layout from '../components/Layout/Layout.js'
import axios from 'axios'
import Spinner from '../components/Spinner.js'
import moment from 'moment';
import Analytics from '../components/Analytics.js'
const {RangePicker} = DatePicker;

const HomePage = () => {
  const [showModel, setShowModel] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransection, setAllTransection] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')
  const [editable, setEditable] = useState(null)

  const [refreshData, setRefreshData] = useState(false) // New state variable

  //Table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render : (text)=> <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Actions',
      render: (text,record) =>(
        <div>
          <EditOutlined onClick={()=>{setEditable(record); setShowModel(true); }} />
          <DeleteOutlined className='mx-2' onClick={()=> {handleDelete(record)}} />
        </div>
      )
    },
  ]

  //Get all transections using useEffect Hook
  useEffect(()=>{
    const getAllTransections = async ()=>{
      try{
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transections/get-transection', {userid: user._id , frequency, selectedDate, type,viewData,editable } )
        setLoading(false)
        setAllTransection(res.data)
        console.log(res.data)
      }catch(error){
        console.log(error)
        message.error('Fetch Issue With Transection')
      }
    }
    getAllTransections()
  }, [frequency, selectedDate, type, viewData,editable, refreshData])

  //Delete Handler
  const handleDelete = async(record)=> {
    // console.log(record)
    try{
      setLoading(true)
      await axios.post('/transections/delete-transection', {transectionId:record._id})
      // setLoading(false)
      message.success('Transection Deleted');
      setRefreshData(prev => !prev) // Toggle refreshData to trigger useEffect
    }catch(error){
      // setLoading(false)
      console.log(error)
      message.error('unable to delete')
    } finally{
      setLoading(false)
    }
  }

  //Form handling
  const handleSubmit = async(values)=>{
    try{
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editable){
        const response = await axios.post('/transections/edit-transection', {payload:{...values, useId:user._id}, transectionId: editable._id})
        console.log('Response:-', response); // Log the response
        setLoading(false)
        message.success('Transection Updated Successfully')
      }else{
        const response = await axios.post('/transections/add-transection', {...values, userid:user._id})
        console.log('Response:-', response); // Log the response
        setLoading(false)
        message.success('Transection Added Successfully')
      }
      setShowModel(false)
      setEditable(null)

    }catch(error){
      setLoading(false);
      console.error('Submission error:-', error); // Log the error
      message.error('Failed to add transection')

    }
  }

  return (
    <Layout>    {/* Here, "Layout" is treated as a html-element. and used as a "tag" */}
        {loading && <Spinner />}
        <div className='filters'>
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values)=> setFrequency(values)}>
              <Select.Option value='7' >Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency==='custom' && <RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)}/> }
          </div>
          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(values)=> setType(values)}>
              <Select.Option value='all' >ALL</Select.Option>
              <Select.Option value='income'>INCOME</Select.Option>
              <Select.Option value='expense'>EXPENSE</Select.Option>
            </Select>
            {frequency==='custom' && <RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)}/> }
          </div>
          <div className='switch-icons'>
              <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={()=> setViewData('table')} />
              <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=> setViewData('analytics')} />
          </div>
          <div>
            <button className='btn btn-primary' onClick={()=> setShowModel(true)}>Add New</button>
          </div>
        </div>
        <div className='content'>
          {viewData === 'table' ? <Table columns={columns} dataSource={allTransection}/> : <Analytics allTransection={allTransection} /> }
        </div>
        <Modal title={editable ? 'Edit Transaction' : 'Add Transection'} open={showModel} onCancel={()=> setShowModel(false)} footer={false}>
          <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>

            <Form.Item label="Amount" name="amount">
              <Input type='text' />
            </Form.Item>

            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Reference" name='reference'>
              <Input type='text' />
            </Form.Item>

            <Form.Item label="Description" name='description'>
              <Input type='text' />
            </Form.Item>

            <Form.Item label="Date" name='date'>
              <Input type='date' />
            </Form.Item>

            <div className='d-flex justify-content-end '>
              <button type='submit' className='btn btn-primary'>Save</button>
            </div>

          </Form>
        </Modal>
    </Layout>
  )
}

export default HomePage