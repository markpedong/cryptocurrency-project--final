'use client'

import { Cryptocurrency, Exchange, GlobalData } from '@/api'
import { PRO_TABLE_PROPS } from '@/constants'
import { setGlobalData } from '@/redux/features/globalSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { formatPrice } from '@/utils'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Progress, Space, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
	data: Exchange[]
	global: GlobalData
}

const Table: FC<Props> = ({ data, global }) => {
	const dispatch = useDispatch<AppDispatch>()
	const coins = useAppSelector(state => state.coin.coins)
	const router = useRouter()
	const { symbol, sign } = useAppSelector(state => state.global.currency)
	const { quote } = coins[0] as unknown as Cryptocurrency

	const columns: ProColumns<Exchange>[] = [
		{
			title: '#',
			align: 'center',
			render: (_, _1, i) => i + 1
		},
		{
			title: 'Name',
			align: 'left',
			render: (_, record) => {
				return (
					<Space align="center">
						<Image src={record.image} alt={`logo${record.id}`} width={25} height={25} />
						<Typography.Link onClick={() => router.push(`/exchanges/${record.id}`)}>
							{record.name}
						</Typography.Link>
					</Space>
				)
			}
		},
		{
			title: 'Volume (24h) Normalized',
			align: 'center',
			render: (_, record) => formatPrice(quote[symbol]?.price * record.trade_volume_24h_btc_normalized)
		},
		{
			title: 'Volume (24h)',
			align: 'center',
			render: (_, record) => formatPrice(quote[symbol]?.price * record.trade_volume_24h_btc)
		},
		{
			title: 'Trust Score',
			align: 'center',
			render: (_, record) => (
				<div>
					<Progress percent={record.trust_score * 10} showInfo={false} size={[30, 15]} />
					{record.trust_score}
				</div>
			)
		}
	]

	useEffect(() => {
		dispatch(setGlobalData(global))
	}, [symbol, sign])

	return <ProTable<Exchange> {...PRO_TABLE_PROPS} rowKey="id" columns={columns} search={false} dataSource={data} />
}

export default Table
