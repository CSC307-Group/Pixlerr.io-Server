import React, { useRef, useEffect } from 'react'
const Canvas = props => {

    const canvasRef = useRef(null)
    const draw = ctx => {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20, 0, 2 * Math.PI)
        ctx.fill()
    }
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw
        context.fillStyle = '#000000'

        context.canvas.height = 500
        context.canvas.width = 1000
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }, [])

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas