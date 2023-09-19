'use client'

import { Cryptocurrency, GlobalData } from '@/api'
import { PRO_TABLE_PROPS } from '@/constants'
import { setCoinArray } from '@/redux/features/coinSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { formatPrice, numberWithCommas } from '@/utils'
import { renderPer } from '@/utils/antd'
import { setLocalStorage } from '@/utils/xLocalStorage'
import { InfoCircleOutlined } from '@ant-design/icons'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Space, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
	data: []
	global: GlobalData
}

const Table: FC<Props> = ({ data, global }) => {
	const { symbol, sign } = useAppSelector(state => state.setCurrency.value)
	const dispatch = useDispatch<AppDispatch>()
	const columns: ProColumns<Cryptocurrency>[] = [
		{
			title: '#',
			align: 'center',
			render: (_, _1, i) => i + 1
		},
		{
			title: 'Name',
			align: 'left',
			render: (_, record) => {
				const src = `https://s2.coinmarketcap.com/static/img/coins/64x64/${record.id}.png`

				return (
					<Space align="center">
						<Image src={src} alt={`logo${record.slug}`} width={25} height={25} />
						<Link href={`/cryptocurrency/${record.slug}`}>{record.name}</Link>
					</Space>
				)
			}
		},
		{
			title: 'Price',
			align: 'right',
			render: (_, { quote }) => formatPrice(quote[symbol]?.price, sign)
		},
		{
			title: '1h %',
			align: 'center',
			render: (_, { quote }) => renderPer(quote[symbol]?.percent_change_1h)
		},
		{
			title: '24 %',
			align: 'center',
			render: (_, { quote }) => renderPer(quote[symbol]?.percent_change_24h)
		},
		{
			title: '7d %',
			align: 'center',
			render: (_, { quote }) => renderPer(quote[symbol]?.percent_change_7d)
		},
		{
			title: (
				<span>
					Market Cap{' '}
					<Tooltip
						color="white"
						title={
							<span style={{ color: 'black' }}>
								The total market value of a cryptocurrency&apos;s circulating supply. It is analogous to
								the free-float capitalization in the stock market. Market Cap = Current Price x
								Circulating Supply.
								<Typography.Link>Read More</Typography.Link>
							</span>
						}
					>
						<InfoCircleOutlined />
					</Tooltip>
				</span>
			),

			align: 'right',
			render: (_, { quote }) => formatPrice(quote[symbol]?.market_cap, sign)
		},
		{
			title: (
				<span>
					Volume(24h){' '}
					<Tooltip
						color="white"
						title={
							<span style={{ color: 'black' }}>
								A measure of how much of a cryptocurrency was traded in the last 24 hours.
								<Typography.Link>Read More</Typography.Link>
							</span>
						}
					>
						<InfoCircleOutlined />
					</Tooltip>
				</span>
			),
			align: 'right',
			render: (_, { quote }) => formatPrice(quote[symbol]?.volume_24h, sign)
		},
		{
			title: (
				<span>
					Circulating Supply{' '}
					<Tooltip
						color="white"
						title={
							<span style={{ color: 'black' }}>
								The amount of coins that are circulating in the market and are in public hands. It is
								analogous to the flowing shares in the stock market.
								<Typography.Link>Read More</Typography.Link>
							</span>
						}
					>
						<InfoCircleOutlined />
					</Tooltip>
				</span>
			),
			align: 'right',
			render: (_, { circulating_supply }) => numberWithCommas(circulating_supply)
		}
	]

	useEffect(() => {
		setLocalStorage('global', global)
		dispatch(setCoinArray(data.slice(0, 9)))
	}, [])

	return (
		<ProTable<Cryptocurrency> {...PRO_TABLE_PROPS} rowKey="id" dataSource={data} columns={columns} search={false} />
	)
}

export default Table
