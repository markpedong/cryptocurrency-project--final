'use client'

import { getGlobalCrypto } from '@/api'
import { MODAL_FORM_PROPS } from '@/constants'
import { setCurrency, setGlobalData, toggleDarkMode } from '@/redux/features/globalSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { numberWithSuffix } from '@/utils'
import { renderPer } from '@/utils/antd'
import { SearchOutlined } from '@ant-design/icons'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { Col, Input, Row, Select, Space, Switch, Typography } from 'antd'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const { Link, Text } = Typography

const Header: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useRouter()
	const pathname = usePathname()
	const currency = useSearchParams().get('currency')
	const coins = useAppSelector(state => state.coin.coins)
	const global = useAppSelector(state => state.global.value)
	const darkMode = useAppSelector(state => state.global.isDark)
	const fiats = useAppSelector(state => state.global.fiats)
	const { symbol } = useAppSelector(state => state.global.currency)

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
					<Col span={12}>
						<Typography.Title level={5}>Coins:</Typography.Title>
						{coins.map(record => {
							const src = `https://s2.coinmarketcap.com/static/img/coins/64x64/${record.id}.png`

							return (
								<div style={{ display: 'flex', marginBlock: '10px', gap: '10px' }} key={record.id}>
									<Image src={src} alt={`logo${record.slug}`} width={25} height={25} />
									<Space align="center">
										<Link href={`/cryptocurrency/${record.slug}`}>{record.name}</Link>
										<Text type="secondary">{record.symbol}</Text>
									</Space>
								</div>
							)
						})}
					</Col>
					<Col span={12}>
						<Typography.Title level={5}>Exchanges:</Typography.Title>
					</Col>
				</Row>
			</ModalForm>
		)
	}

	const fetchNewGlobal = async () => {
		const { sign, symbol: newSymbol } = fiats.find(fiat => fiat.symbol === symbol)
		const global = await getGlobalCrypto({ convert: symbol })

		dispatch(setGlobalData(global.data))
		dispatch(setCurrency({ sign, symbol: newSymbol }))
	}

	useEffect(() => {
		fetchNewGlobal()
	}, [symbol, currency])

	return (
		<Row style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Space style={{ fontSize: '0.7rem' }}>
				Cryptos:<Link style={{ fontSize: '0.7rem' }}>{global.active_cryptocurrencies}</Link>
				Exchanges:<Link style={{ fontSize: '0.7rem' }}>{global.active_exchanges}</Link>
				Market Cap:
				<Link style={{ fontSize: '0.7rem' }}>
					{numberWithSuffix(global?.quote[symbol]?.total_market_cap)}{' '}
					{renderPer(global?.quote[symbol]?.total_market_cap_yesterday_percentage_change)}
				</Link>
				24h Vol:
				<Link style={{ fontSize: '0.7rem' }}>
					{numberWithSuffix(global?.quote[symbol]?.total_volume_24h)}{' '}
					{renderPer(global?.quote[symbol]?.total_volume_24h_yesterday_percentage_change)}
				</Link>
				Dominance:
				<Link style={{ fontSize: '0.7rem' }}>
					BTC: {global?.btc_dominance?.toFixed(2)?.replace('-', '')}%
					{renderPer(global?.btc_dominance_24h_percentage_change)} ETH:{' '}
					{global?.eth_dominance?.toFixed(2)?.replace('-', '')}%
					{renderPer(global?.eth_dominance_24h_percentage_change)}
				</Link>
			</Space>
			<Space align="center">
				{renderSearch()}
				<Select
					showSearch
					placeholder="USD, PHP, CNY"
					options={fiats.map(item => ({ label: `${item.sign} ${item.name}`, value: item.symbol }))}
					filterOption={(input, option) =>
						String(option?.label ?? '')
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					onChange={val => {
						const { sign, symbol } = fiats.find(fiat => fiat.symbol === val)

						dispatch(setCurrency({ sign, symbol }))

						navigate.push(`${pathname}?currency=${symbol}`)
						// navigate.refresh()
					}}
					style={{ width: 150 }}
					value={symbol}
				/>

				<Switch
					onChange={() => {
						dispatch(toggleDarkMode())
					}}
					checked={darkMode}
					checkedChildren="Dark"
					unCheckedChildren="Light"
				/>
			</Space>
		</Row>
	)
}

export default Header
