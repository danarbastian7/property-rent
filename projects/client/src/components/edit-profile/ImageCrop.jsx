function ImageCrop({ imageSrc, onImageCrop }) {
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 })
  const [completedCrop, setCompletedCrop] = useState(null)

  const onLoad = (image) => {
    const aspect = 1 // You can adjust the aspect ratio here
    const width = 30 // You can adjust the initial width here

    const height = (width / aspect) * 100
    setCrop({ unit: "%", width, aspect })
    setCompletedCrop({ unit: "%", width, height })
  }

  const handleCropChange = (newCrop) => {
    setCrop(newCrop)
  }

  const handleImageCrop = async () => {
    if (completedCrop) {
      const image = document.createElement("img")
      image.src = imageSrc

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      const croppedImage = await getCroppedImage(
        image,
        completedCrop,
        scaleX,
        scaleY
      )

      onImageCrop(croppedImage)
    }
  }

  const getCroppedImage = (image, crop, scaleX, scaleY) => {
    const canvas = document.createElement("canvas")
    const width = crop.width
    const height = crop.height
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      width,
      height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Could not create a cropped image blob."))
          return
        }
        resolve(blob)
      }, "image/jpeg")
    })
  }

  return (
    <div>
      <ReactCrop
        src={imageSrc}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={handleCropChange}
        onComplete={(crop) => setCompletedCrop(crop)}
      />
      <Button onClick={handleImageCrop}>Crop</Button>
    </div>
  )
}
