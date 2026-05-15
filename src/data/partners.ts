const logoModules = import.meta.glob<string>('../assets/Empresas Parceiras/*.png', {
  eager: true,
  import: 'default',
})

function partnerNameFromPath(path: string) {
  const fileName = path.split('/').pop() ?? ''
  return fileName.replace(/^logo/i, '').replace(/\.png$/i, '').trim()
}

export type Partner = {
  name: string
  logo: string
  alt: string
}

export const partners: Partner[] = Object.entries(logoModules)
  .map(([path, logo]) => {
    const name = partnerNameFromPath(path)
    return {
      name,
      logo,
      alt: `Logo ${name}`,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
