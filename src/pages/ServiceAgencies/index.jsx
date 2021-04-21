import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Layout } from 'antd';
import {
  CommonNavBar,
  ContainerWithCorner,
  GridLayout,
  ContainerWithBorder,
  RowChart,
  CommomMap,
} from '../../components';
import agencyStatisticsIcon from '../../assets/images/service-agency/agency-statistics-icon.png';
import StachChart from './StackChart';
import './index.scss';

const { Content } = Layout;

const mockData = {
  '1-2': {
    data: [
      { name: '残联机构', values: [51, 35, 45] },
      { name: '康复机构', values: [47, 50, 40] },
      { name: '托养机构', values: [49, 40, 18] },
      { name: '残疾人之家', values: [48, 50, 45] },
    ]
  },
  '2-2': {
    grid: [
      {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0,
        containLabel: true,
      }
    ],
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
    ],
    series: [
      {
        type: 'bar',
        data: [2, 4, 6, 6, 8, 6, 2, 2, 3, 1, 5, 6],
      },
      {
        type: 'line',
        data: [2, 4, 6, 6, 8, 6, 2, 2, 3, 1, 5, 6],
      }
    ]
  },
  '3-2': {
    data: [
      { name: '无锡残疾人辅助器具中心', value: 543769 },
      { name: '无锡市残疾人就业信息网', value: 358125 },
      { name: '无锡市残疾人联合会', value: 335155 },
      { name: '无锡市残疾人康复中心', value: 255145 },
      { name: '无锡市残疾人康复研究会', value: 228131 },
      { name: '无锡市盲人联合会', value: 213154 },
      { name: '无锡市肢体残障联合会', value: 185354 },
      { name: '无锡市治理残障康复中心', value: 165835 },
      { name: '无锡市听力康复中心', value: 164528 },
    ],
    unit: '人',
  },
}

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 24 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 6 },
  { i: '3-2', x: 18, y: 6, w: 6, h: 18 },
];

const parseNumber = (number) => {
  return number
    .toString()
    .split('')
    .reverse()
    .reduce((result, item, index) => {
      if (index && index % 3 === 0) {
        result.push(',');
      }
      result.push(item);
      return result;
    }, [])
    .reverse()
    .join('');
}

const agencyStatisticsList = [
  { name: '服务机构数量', key: 'agency' },
  { name: '工作人员数量', key: 'staff' },
  { name: '服务对象数量', key: 'customer' },
];

const businessStatisticsList = [
  { name: '单位数量', key: 'dwsl', unit: '个' },
  { name: '安置残疾人数', key: 'azcjrs', unit: '人' },
];

const ServiceAgencies = () => {
  // 残疾人康复机构数据统计
  const [agencyStatisticsData, setAgencyStatisticsData] = useState({
    agency: 0,
    staff: 0,
    customer: 0,
  });
  useEffect(() => {
    setAgencyStatisticsData({
      agency: parseNumber(168),
      staff: parseNumber(2365),
      customer: parseNumber(1183),
    });
  }, []);
  // echarts图表配置
  const [echartsOptions, setEchartsOptions] = useState({
    // 服务机构数据
    '1-2': {},
    // 机构每月残疾人变化趋势
    '2-2': {},
    // 残联机构
    '3-2': {},
  });
  const mergeEchartsOptions = useCallback((mergeData) => {
    setEchartsOptions(oldData => ({
      ...oldData,
      ...mergeData,
    }))
  }, []);
  // 当前选中的服务机构数据
  useEffect(() => {
    mergeEchartsOptions(mockData);
  }, [mergeEchartsOptions]);
  // 残疾人服务机构办理事务情况统计
  const [businessStatisticsData, setBusinessStatisticsData] = useState({
    'dwsl': 0,
    'azcjrs': 0,
  });
  useEffect(() => {
    setBusinessStatisticsData({
      'dwsl': parseNumber(1269),
      'azcjrs': parseNumber(35118),
    })
  }, []);
  return (
    <Layout className="service-agencies">
      <CommonNavBar showTime={true} title="服务机构" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="service-agencies-content">
        <GridLayout layout={layout}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人康复机构数据统计</span>
            </div>
            <div className="grid-item-content agency-statistics">
              {agencyStatisticsList.map(item => {
                const { key, name } = item;
                const value = agencyStatisticsData[key] || 0;
                return (
                  <div key={key} className="agency-statistics-item">
                    <div className="agency-statistics-value">
                      <img
                        alt=""
                        src={agencyStatisticsIcon}
                        className="agency-statistics-icon"
                      />
                      {value}
                    </div>
                    <div className="agency-statistics-name">{name}</div>
                  </div>
                )
              })}
            </div>
            <div className="grid-item-title">
              <span>服务机构数据</span>
            </div>
            <div
              className="grid-item-content"
              style={{ flex: 4 }}
            >
              <StachChart
                option={echartsOptions['1-2']}
                style={{ flex: 1 }}
              />
            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">
            <CommomMap />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>机构每月残疾人变化趋势</span>
            </div>
            <ReactEcharts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人服务机构办理事务情况统计</span>
            </div>
            <div className="grid-item-content business-statistics">
              {businessStatisticsList.map(item => {
                const { key, name, unit } = item;
                const value = businessStatisticsData[key];
                return (
                  <div
                    key={key}
                    className="business-statistics-item"
                  >
                    <div>
                      <div>
                        <span className="business-statistics-value">{value}</span>
                        <span>&nbsp;</span>
                        <span className="business-statistics-unit">{unit}</span>
                      </div>
                      <div className="business-statistics-name">{name}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>残联机构</span>
            </div>
            <RowChart
              option={echartsOptions['3-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </Layout>
  )

}


export default ServiceAgencies