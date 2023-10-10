import { getBitcoin } from '@/redux/features/coinSlice'
import { getAllCurrency } from '@/redux/features/globalSlice'
import { useAppSelector } from '@/redux/store'
import { formatPrice, numberWithCommas } from '@/utils'
import { Typography, Divider } from 'antd'
import React, { FC } from 'react'

type Props = {
	title: string
	dataSign?: number
	dataSym?: number
	data?: string
	divider?: boolean
}

const StatsTitle: FC<Props> = ({ dataSign, data, title, dataSym, divider = true }) => {
	const { sign } = useAppSelector(getAllCurrency)
	const coin = useAppSelector(getBitcoin)

	return (
		<>
			<div style={{ justifyContent: 'space-between', display: 'flex' }}>
				<Typography.Text type="secondary">{title}</Typography.Text>
				{dataSign && <Typography.Text strong>{formatPrice(dataSign, sign)}</Typography.Text>}
				{dataSym && (
					<Typography.Text strong>
						{numberWithCommas(dataSym)} {coin.symbol}
					</Typography.Text>
				)}
				{data && <Typography.Text strong>{data}</Typography.Text>}
			</div>
			{divider && <Divider />}
		</>
	)
}

export default StatsTitle
