import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { IMonthlySales } from '@/types/statistics.interface'
import styles from './MiddleStatistics.module.scss'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { formatPrice } from '@/lib/string/formatPrice'

const chartConfig = {
  value: {
    label: 'Прибыль',
    color: '#3b82f6'
  }
} satisfies ChartConfig

interface OverviewProps {
  data: IMonthlySales[]
}

export default function Overview({ data }: OverviewProps) {
  return (
		<Card>
			<CardHeader className={styles.header}>
				<CardTitle>Прибыль</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className='aspect-auto h-[310px] w-full'
					config={chartConfig}
				>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={0}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={formatPrice}
									indicator='line'
								/>
							}
						/>
						<Area
							dataKey='value'
							type='natural'
							fill='#6366f1'
							stroke='#6366f1'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}