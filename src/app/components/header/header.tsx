import { GlobalData } from '@/api'
import { MODAL_FORM_PROPS } from '@/constants'
import { useAppSelector } from '@/redux/store'
import { numberWithSuffix } from '@/utils'
import { renderPer } from '@/utils/antd'
import { getLocalStorage } from '@/utils/xLocalStorage'
import { SearchOutlined } from '@ant-design/icons'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { Col, Input, Row, Space, Switch, Typography } from 'antd'
import { FC } from 'react'

type Props = {
	darkMode: boolean
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const { Link } = Typography

const Header: FC<Props> = ({ darkMode, setDarkMode }) => {
	// const { sign, symbol } = useAppSelector(state => state.setCurrency.value)
	const coins = useAppSelector(state => state.setCoin.coins)
	const global = getLocalStorage('global') as unknown as GlobalData

	const data = {
		active: global?.active_cryptocurrencies,
		exchanges: global?.active_exchanges,
		mcap: numberWithSuffix(global?.quote?.['USD']?.total_market_cap),
		mcap_per: global?.quote?.['USD']?.total_market_cap_yesterday_percentage_change,
		volume: numberWithSuffix(global?.quote?.['USD']?.total_volume_24h),
		volume_per: global?.quote?.['USD']?.total_volume_24h_yesterday_percentage_change,
		btc: global?.btc_dominance?.toFixed(2).replace('-', ''),
		btc_per: global?.btc_dominance_24h_percentage_change,
		eth: global?.eth_dominance?.toFixed(2).replace('-', ''),
		eth_per: global?.eth_dominance_24h_percentage_change
	}

	const renderSearch = () => {
		return (
			<ModalForm
				{...MODAL_FORM_PROPS}
				trigger={
					<Input
						size="middle"
						prefix={<SearchOutlined />}
						style={{ width: 150 }}
						placeholder="eg. Bitcoin, Etherum"
					/>
				}
				submitter={false}
				modalProps={{ closeIcon: false }}
				width={600}
			>
				<ProFormText placeholder="eg. Ethereum, Avalanche, Binance Smart Chain" />
				<Row justify="space-between">
					<Col>
						<Typography.Title level={5}>Coins:</Typography.Title>
						{coins.map(o => (
							<div>{o.name}</div>
						))}
					</Col>
					<Col>
						<Typography.Title level={5}>Exchanges:</Typography.Title>
					</Col>
				</Row>
			</ModalForm>
		)
	}

	return (
		<Row style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Space style={{ fontSize: '0.7rem' }}>
				Cryptos:<Link style={{ fontSize: '0.7rem' }}>{data.active}</Link>
				Exchanges:<Link style={{ fontSize: '0.7rem' }}>{data.exchanges}</Link>
				Market Cap:
				<Link style={{ fontSize: '0.7rem' }}>
					{data.mcap} {renderPer(data.mcap_per)}
				</Link>
				24h Vol:
				<Link style={{ fontSize: '0.7rem' }}>
					{data.volume} {renderPer(data.volume_per)}
				</Link>
				Dominance:
				<Link style={{ fontSize: '0.7rem' }}>
					BTC: {data.btc}%{renderPer(data.btc_per)} ETH: {data.eth}%{renderPer(data.eth_per)}
				</Link>
			</Space>
			<Space align="center">
				{renderSearch()}
				<Switch
					onChange={() => {
						setDarkMode(!darkMode)
					}}
					checkedChildren="Dark"
					unCheckedChildren="Light"
				/>
			</Space>
		</Row>
	)
}

export default Header