import { formatPrice } from '@/constants'
import { useAppSelector } from '@/redux/store'
import { renderPer } from '@/utils'
import { Divider, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { FC } from 'react'

type Props = {
	title?: string
	data?: number | string
	date?: string
	per?: number
	divider?: boolean
}

const StatisticsData: FC<Props> = ({ data, title, date, per, divider = true }) => {
	const { sign } = useAppSelector(state => state.setCurrency.value)

	const subtractedDate = new Date().getFullYear() - new Date(date).getFullYear()

	return (
		<>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
				<Typography.Text
					style={{
						textAlign: 'left',
						fontSize: date ? '12px' : '13px',
						gridArea: !date && '1 / 1 / 3 / 2',
						alignSelf: !date && 'center',
						color: 'black',
						fontWeight: 600
					}}
					type="secondary"
				>
					{title}
				</Typography.Text>
				<Typography.Text strong style={{ textAlign: 'right', fontSize: '12px' }}>
					{formatPrice(sign, data)}
				</Typography.Text>
				{date && (
					<Typography.Text style={{ textAlign: 'left', fontSize: '12px' }} type="secondary">
						{dayjs(date).format('MMMM D, YYYY')} ({subtractedDate} years ago)
					</Typography.Text>
				)}
				<Typography.Text strong style={{ textAlign: 'right', fontSize: '12px' }}>
					{renderPer(per)}
				</Typography.Text>
			</div>
			{divider && <Divider />}
		</>
	)
}

export default StatisticsData
{
	/*  */
}
