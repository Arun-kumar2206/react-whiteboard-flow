import React, { useState, useRef, useEffect } from 'react'
import js2flowchart from 'js2flowchart';
import pencilIcon from '../IMAGES/pencil.ico';
import eraserIcon from '../IMAGES/eraser.ico';
import resetIcon from '../IMAGES/reset.ico';
import flowChartIcon from '../IMAGES/flowchart.ico';

const WhiteboardFlow = ({width, height, code, className}) => {
    const [pencilActive, setPencilActive] = useState(false);
    const [eraserActive, setEraserActive] = useState(false);
    const [flowChartActive, setFlowChartActive] = useState(false);
    const [flowchartVisible, setFlowchartVisible] = useState(false);
    const [canvasBackup, setCanvasBackup] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width, height });
    const canvasRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (pencilActive) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000';
        } else if (eraserActive) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 15;
        }

        let isDrawing = false;

        const handleMouseDown = (e) => {
            if (!pencilActive && !eraserActive) return;
            isDrawing = true;
            setDrawing(true);
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        };

        const handleMouseMove = (e) => {
            if ((!pencilActive && !eraserActive) || !isDrawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        };

        const handleMouseUp = () => {
            isDrawing = false;
            setDrawing(false);
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [pencilActive, eraserActive]);

    const handlePencilClick = () => {
        setPencilActive(true);
        setEraserActive(false);
    };

    const handleEraserClick = () => {
        setEraserActive(true);
        setPencilActive(false);
    };

    const handleResetClick = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleFlowchartClick = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!flowchartVisible) {
            setCanvasBackup(ctx.getImageData(0, 0, canvas.width, canvas.height));
            let svg;
            try {
                svg = js2flowchart.convertCodeToSvg(code || '');
            } catch (e) {
                alert('Invalid JS code for flowchart!');
                return;
            }
            // Get SVG size
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
            const svgEl = svgDoc.documentElement;
            let svgWidth = parseInt(svgEl.getAttribute('width')) || 800;
            let svgHeight = parseInt(svgEl.getAttribute('height')) || 600;
            setCanvasSize({ width: svgWidth, height: svgHeight });
            // Convert SVG to image and draw on canvas
            const img = new window.Image();
            const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
                URL.revokeObjectURL(url);
            };
            img.src = url;
            setFlowchartVisible(true);
            setFlowChartActive(true);
        } else {
            // Restore previous canvas
            setCanvasSize({ width, height });
            if (canvasBackup) {
                ctx.putImageData(canvasBackup, 0, 0);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            setFlowchartVisible(false);
            setFlowChartActive(false);
        }
    };

    return(
        <div
            ref={scrollContainerRef}
            style={{
                position: 'relative',
                display: 'inline-block',
                width: 430, 
                height: 650, 
                maxWidth: '100%',
                maxHeight: '100%',
                overflow: 'auto',
                border: '1px solid #ccc',
                background: '#fff'
            }}
        >
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                code={code}
                className={className}
                id='whiteboard-canvas'
                style={{ 
                    cursor: pencilActive
                        ? `url(${pencilIcon}) 0 14, auto`
                        : eraserActive
                            ? `url(${eraserIcon}) 0 14, auto`
                            : 'default',
                    background: '#fff',
                    display: 'block',
                }}
            ></canvas>
            <button
                type='button'
                onClick={handlePencilClick}
                style={{ 
                    width: 30, 
                    height: 30, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: pencilActive ? '#e0e0e0' : 'white', 
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    cursor: 'pointer',
                    boxShadow: pencilActive ? '0 0 4px #aaa' : 'none',
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    marginTop: 0
                }}
            >
                <img src={pencilIcon} alt="pencil-icon" style={{ width: 24, height: 24 }} />
            </button>
            <button
                type='button'
                onClick={handleEraserClick}
                style={{
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems:'center',
                    justifyContent: 'center',
                    background: eraserActive ? '#e0e0e0' : 'white',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    cursor: 'pointer',
                    boxShadow: eraserActive ? '0 0 4px #aaa' : 'none',
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    marginTop: 35
                }}
            >
                <img src={eraserIcon} alt="eraser-icon" style={{ width: 24, height: 24}} />
            </button>
            <button
                type='button'
                onClick={handleResetClick}
                style={{
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    cursor: 'pointer',
                    boxShadow: 'none',
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    marginTop: 70
                }}
            >
                <img src={resetIcon} alt="reset-icon" style={{ width: 24, height: 24}} />
            </button>
            <button
                type='button'
                onClick={handleFlowchartClick}
                style={{
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems:'center',
                    justifyContent: 'center',
                    background: flowChartActive ? '#e0e0e0' : 'white',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    cursor: 'pointer',
                    boxShadow: flowChartActive ? '0 0 4px #aaa' : 'none',
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    marginTop: 110
                }}
            >
                <img src={flowChartIcon} alt="flowchart-icon" style={{ width: 24, height: 24}} />
            </button>
        </div>
    )
}

export default WhiteboardFlow;