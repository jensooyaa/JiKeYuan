import { BarChart } from "./conponents/BarChart"
const Home = () => {
    return (

        <div>
            <div>
                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>三大框架使用度</div>
                <BarChart
                    xData={['Vue', 'React', 'Angular']}
                    sData={[2000, 5000, 1000]} >

                </BarChart>
            </div>
            <div>
                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>三大框架满意度</div>
                <BarChart
                    xData={['Vue', 'React', 'Angular']}
                    sData={[200, 500, 100]}
                    style={{ width: '500px', height: '400px' }}>
                </BarChart>
            </div>

        </div >
    )
}

export default Home