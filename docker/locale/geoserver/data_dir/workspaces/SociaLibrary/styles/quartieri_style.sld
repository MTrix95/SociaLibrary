<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <!-- a named layer is the basic building block of an sld document -->

  <NamedLayer>
    <Name>Quartieri</Name>
    <UserStyle>
      <Title></Title>
      <Abstract></Abstract>
      <FeatureTypeStyle>
        <Rule>
          <Name>Q1</Name>
          <Title>Municipio 1</Title>
          <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>nome</ogc:PropertyName> <!-- Nome colonna -->
                <ogc:Literal>MUNICIPIO N.1</ogc:Literal> <!-- Valore da stilizzare -->
              </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#ffffff</CssParameter>
                <CssParameter name="fill-opacity">0.2</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#000000</CssParameter>
                <CssParameter name="stroke-width">1</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
        </Rule>
        <Rule>
          <Name>Q2</Name>
          <Title>Municipio 2</Title>
          <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>nome</ogc:PropertyName> <!-- Nome colonna -->
                <ogc:Literal>MUNICIPIO N.2</ogc:Literal> <!-- Valore da stilizzare -->
              </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#ffffff</CssParameter>
                <CssParameter name="fill-opacity">0.5</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#000000</CssParameter>
                <CssParameter name="stroke-width">1</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
        </Rule>
        <Rule>
          <Name>Q3</Name>
          <Title>Municipio 3</Title>
          <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>nome</ogc:PropertyName> <!-- Nome colonna -->
                <ogc:Literal>MUNICIPIO N.3</ogc:Literal> <!-- Valore da stilizzare -->
              </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#ffffff</CssParameter>
                <CssParameter name="fill-opacity">0.5</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#000000</CssParameter>
                <CssParameter name="stroke-width">1</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
        </Rule>
        <Rule>
          <Name>Q4</Name>
          <Title>Municipio 4</Title>
          <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>nome</ogc:PropertyName> <!-- Nome colonna -->
                <ogc:Literal>MUNICIPIO N.4</ogc:Literal> <!-- Valore da stilizzare -->
              </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#ffffff</CssParameter>
                <CssParameter name="fill-opacity">0.5</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#000000</CssParameter>
                <CssParameter name="stroke-width">1</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
        </Rule>
        <Rule>
          <Name>Q5</Name>
          <Title>Municipio 5</Title>
          <ogc:Filter>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>nome</ogc:PropertyName> <!-- Nome colonna -->
                <ogc:Literal>MUNICIPIO N.5</ogc:Literal> <!-- Valore da stilizzare -->
              </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
              <Fill>
                <CssParameter name="fill">#ffffff</CssParameter>
                <CssParameter name="fill-opacity">0.5</CssParameter>
              </Fill>
              <Stroke>
                <CssParameter name="stroke">#000000</CssParameter>
                <CssParameter name="stroke-width">1</CssParameter>
              </Stroke>
            </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>