<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl m"
                xmlns:m="http://santedb.org/matcher"
                xmlns="http://www.w3.org/1999/xhtml"

>
  <xsl:output method="html" indent="yes" />

  <xsl:template match="m:MatchConfiguration">
    <html>
      <head>
        <title>
          Match Configuration - <xsl:value-of select="@id" />
        </title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-PDle/QlgIONtM1aqA2Qemk5gPOE7wFq8+Em+G/hmo5Iq0CCmYZLv3fVRDJ4MMwEA" crossorigin="anonymous" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
      </head>
      <body class="w-50 m-auto">
        <a name="top" />
        <h1>
          Match Configuration - <xsl:value-of select="@id" />
        </h1>
        <ul>
          <li>
            <a href="#a0">0. Metadata</a>
          </li>
          <li>
            <a href="#a1">1. Blocking</a>
            <ul>
              <xsl:for-each select="m:blocking">
                <li>
                  <a href="#a1{position()}">
                    1.<xsl:value-of select="position()" />. Blocking Instruction <xsl:value-of select="position()" />
                  </a>
                  <ul>
                    <li>
                      <a href="#a1{position()}1">
                        1.<xsl:value-of select="position()" />.1 Summary
                      </a>
                    </li>
                    <li>
                      <a href="#a1{position()}2">
                        1.<xsl:value-of select="position()" />.2 Pseudocode
                      </a>
                    </li>
                  </ul>
                </li>
              </xsl:for-each>
            </ul>
          </li>
          <li>
            <a href="#a2">2. Scoring</a>
            <ul>
              <xsl:for-each select="m:scoring/m:attribute">
                <li>
                  <a href="#a2{position()}">
                    2.<xsl:value-of select="position()" />. <xsl:value-of select="@property" /> <xsl:if test="@id">
                      (<xsl:value-of select="@id" />)
                    </xsl:if>
                  </a>
                  <ul>
                    <li>
                      <a href="#a2{position()}1">
                        2.<xsl:value-of select="position()" />.1 Summary
                      </a>
                    </li>
                    <li>
                      <a href="#a2{position()}2">
                        2.<xsl:value-of select="position()" />.2 Assertions
                      </a>
                    </li>
                    <li>
                      <a href="#a2{position()}3">
                        2.<xsl:value-of select="position()" />.3 Partial Scoring
                      </a>
                    </li>
                    <li>
                      <a href="#a2{position()}4">
                        2.<xsl:value-of select="position()" />.4 Pseudocode
                      </a>
                    </li>
                  </ul>
                </li>
              </xsl:for-each>
            </ul>
          </li>
          <li>
            <a href="#a3">3. Classification</a>
          </li>
        </ul>
        <h2>
          <a name="a0" />0. Metadata
        </h2>
        <table class="table table-striped">
          <tbody>
            <tr>
              <th class="text-right">ID</th>
              <td>
                <xsl:value-of select="@id" />
              </td>
            </tr>
            <tr>
              <th class="text-right">Version</th>
              <td>
                <xsl:value-of select="m:meta/m:version" />
              </td>
            </tr>
            <tr>
              <th class="text-right">Author</th>
              <td>
                <xsl:value-of select="m:meta/m:createdBy" />
              </td>
            </tr>
            <tr>
              <th class="text-right">Created On</th>
              <td>
                <xsl:value-of select="m:meta/m:creationTime" />
              </td>
            </tr>
            <tr>
              <th class="text-right">Status</th>
              <td>
                <xsl:choose>
                  <xsl:when test="m:meta/m:status = 'Active'">
                    <i class="fas fa-check"></i>
                  </xsl:when>
                  <xsl:when test="m:meta/m:status = 'Inactive'">
                    <i class="fas fa-times"></i>
                  </xsl:when>
                  <xsl:when test="m:meta/m:status = 'Obsolete'">
                    <i class="fas fa-trash" />
                  </xsl:when>
                </xsl:choose>
                <xsl:value-of select="m:meta/m:status" />
              </td>
            </tr>
            <tr>
              <th class="text-right">Target(s)</th>
              <td>
                <ul class="m-0">
                  <xsl:for-each select="m:target">
                    <li>
                      <xsl:value-of select="@resource" />
                    </li>
                  </xsl:for-each>
                </ul>
              </td>
            </tr>
            <tr>
              <th align="right">Tags</th>
              <td>
                <ul class="m-0">
                  <xsl:for-each select="m:meta/m:tags/m:add">
                    <li>
                      <strong>
                        <xsl:value-of select="@key" />
                      </strong> =
                      <xsl:value-of select="text()" />
                    </li>
                  </xsl:for-each>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>
          <a name="a1" /> 1. Blocking
        </h2>
        <xsl:apply-templates select="m:blocking" />
        <h2>
          <a name="a2" />2. Scoring
        </h2>
        <xsl:apply-templates select="m:scoring/m:attribute" />

        <h2>
          <a name="a3" />3. Classification
        </h2>
        <div class="container-fluid">

          <div class="row">

            <div class="col alert-danger text-center p-2">
              <span>NON-MATCH</span>
              <span class="h-100 badge badge-danger float-right" style="margin-right:0em;">
                &lt; <xsl:value-of select="@nonmatchThreshold" />
              </span>
            </div>
            <div class="col alert-warning text-center p-2">
              PROBABLE
            </div>
            <div class="col alert-success text-center p-2">
              <span class="h-100 badge badge-success float-left" style="margin-left:0em">
                <xsl:value-of select="@matchThreshold" /> &gt;
              </span>
              <span>MATCH</span>
            </div>
          </div>
        </div>

        <a href="#top">Back to Top</a>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="m:blocking" mode="pseudocode">
    <xsl:variable name="indent" select="'&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;'" />
    <code class="bg-dark text-light d-block">
      def block_<xsl:value-of select="position()" />($input):<br />
      <xsl:value-of disable-output-escaping="yes" select="$indent" />var $records = [];<br />
      <xsl:for-each select="m:filter">
        <xsl:choose>
          <xsl:when test="@when">
            <xsl:value-of disable-output-escaping="yes" select="$indent" />if (get($input, '<xsl:value-of select="@when" />')) then<br />
            <xsl:value-of disable-output-escaping="yes" select="concat($indent,$indent)" />$records = $records <xsl:choose>
              <xsl:when test="@op = 'or' or position = 1">union with</xsl:when>
              <xsl:otherwise>intersect with</xsl:otherwise>
            </xsl:choose> query(<xsl:value-of select="." />);<br />
            <xsl:value-of disable-output-escaping="yes" select="$indent" />end if;<br />
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of disable-output-escaping="yes" select="concat($indent,$indent)" />$records = $records <xsl:choose>
              <xsl:when test="@op = 'or' or position = 1">union with</xsl:when>
              <xsl:otherwise>intersect with</xsl:otherwise>
            </xsl:choose> query(<xsl:value-of select="." />);<br />
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
      <xsl:value-of disable-output-escaping="yes" select="$indent" />return limit($records, <xsl:value-of select="@maxResults" />);<br />
      end def;<br />
    </code>
  </xsl:template>
  <xsl:template match="m:attribute" mode="pseudocode">
    <xsl:variable name="indent" select="'&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;'" />
    <code class="bg-dark text-light d-block">
      <xsl:if test="@description">
        // <xsl:value-of select="@description" />
      </xsl:if>
      def <xsl:choose>
        <xsl:when test="@id">
          score_<xsl:value-of select="@id" />
        </xsl:when>
        <xsl:otherwise>
          score_<xsl:value-of select="position()" />
        </xsl:otherwise>
      </xsl:choose>($input, $blocked, $context):<br />

      <xsl:if test="m:when">
        <xsl:value-of select="$indent" disable-output-escaping="yes" />if
        <xsl:for-each select="m:when/m:attribute">
          (get_score($context, <xsl:value-of select="@ref" />)
          <xsl:choose>
            <xsl:when test="@op = 'eq'"> == </xsl:when>
            <xsl:when test="@op = 'ne'"> != </xsl:when>
            <xsl:when test="@op = 'lt'"> &lt; </xsl:when>
            <xsl:when test="@op = 'gt'"> &gt; </xsl:when>
            <xsl:when test="@op = 'lte'"> &lt;= </xsl:when>
            <xsl:when test="@op = 'gte'"> &gt;= </xsl:when>
            <xsl:otherwise> &gt; </xsl:otherwise>
          </xsl:choose>
          <xsl:choose>
            <xsl:when test="@value">
              <xsl:value-of select="@value" />
            </xsl:when>
            <xsl:otherwise>0.0</xsl:otherwise>
          </xsl:choose>)
          <xsl:if test="position() != last()"> and </xsl:if>
        </xsl:for-each> then
      </xsl:if>
      <xsl:value-of select="$indent" disable-output-escaping="yes" />var $a = get($input, '<xsl:value-of select="translate(@property, ' ', '|')" />');<br />
      <xsl:value-of select="$indent" disable-output-escaping="yes" />var $b = get($blocked, '<xsl:value-of select="translate(@property, ' ', '|')" />');<br />
      <xsl:value-of select="$indent" disable-output-escaping="yes" />var $result = false;<br />
      <xsl:value-of select="$indent" disable-output-escaping="yes" />var $score = 0.0;<br />
      <xsl:apply-templates select="m:assert" mode="pseudocode">
        <xsl:with-param name="indent"  select="$indent" />
      </xsl:apply-templates>
      <br />

      <xsl:value-of select="$indent" disable-output-escaping="yes" />if $result == true then<br />
      <xsl:value-of select="$indent" disable-output-escaping="yes" /><xsl:value-of select="$indent" disable-output-escaping="yes" /> $score = ln(<xsl:value-of select="@m" /> / <xsl:value-of select="@u" />) / ln(2);
      <br /> <xsl:value-of select="$indent" disable-output-escaping="yes" />else <br />
      <xsl:value-of select="$indent" disable-output-escaping="yes" /><xsl:value-of select="$indent" disable-output-escaping="yes" /> $score = ln((1 - <xsl:value-of select="@m" />) / (1 - <xsl:value-of select="@u" />)) / ln(2);
      <br /> <xsl:value-of select="$indent" disable-output-escaping="yes" />end if; <br />

      <xsl:if test="m:partialWeight">
        <xsl:value-of select="$indent" disable-output-escaping="yes" />$score *= fn($a, $b): <br />
        <xsl:apply-templates mode="pseudocode" select="m:partialWeight/m:transform">
          <xsl:with-param name="indent" select="concat($indent, $indent)" />
        </xsl:apply-templates>
        <xsl:value-of select="concat($indent, $indent)" disable-output-escaping="yes" />return <xsl:value-of select="m:partialWeight/@name" />($a,$b)<br />
        <xsl:value-of select="$indent" disable-output-escaping="yes" />end fn;<br />
      </xsl:if>
      <xsl:value-of select="$indent" disable-output-escaping="yes" />return $score;<br />
      end def;<br />
    </code>
  </xsl:template>

  <xsl:template match="m:assert" mode="pseudocode">
    <xsl:param name="indent" />
    <xsl:apply-templates select="m:transform" mode="pseudocode">
      <xsl:with-param name="indent" select="$indent" />
    </xsl:apply-templates>
    <xsl:choose>
      <xsl:when test="@op = 'and' or @op = 'or'">
        <xsl:for-each select="m:assert">
          <xsl:value-of disable-output-escaping="yes" select="$indent" />set $result = $result <xsl:value-of select="../@op" /> <br />
          <xsl:value-of disable-output-escaping="yes" select="concat($indent, '&amp;nbsp;&amp;nbsp;&amp;nbsp;')" />fn ($a, $b):<br />
          <xsl:apply-templates select="." mode="pseudocode">
            <xsl:with-param name="indent" select="concat($indent, '&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;')" />
          </xsl:apply-templates>
          <xsl:value-of disable-output-escaping="yes" select="concat($indent, '&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;')" />return $result;<br />
          <xsl:value-of disable-output-escaping="yes" select="concat($indent, '&amp;nbsp;&amp;nbsp;&amp;nbsp;')" />end fn;<br />
        </xsl:for-each>
      </xsl:when>

      <xsl:when test="@op = 'eq' and not(@value)">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $result = $a == $b;<br />
      </xsl:when>
      <xsl:when test="@op = 'ne' and not(@value)">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $result = $a != $b) then<br />
      </xsl:when>
      <xsl:when test="@op = 'eq'">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $result = $result == <xsl:value-of select="@value" /><br />
      </xsl:when>
      <xsl:when test="@op = 'ne'">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $resut = $result != <xsl:value-of select="@value" /><br />
      </xsl:when>
      <xsl:when test="@op = 'lt'">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $result = $result &lt; <xsl:value-of select="@value" /><br />
      </xsl:when>
      <xsl:when test="@op = 'gt'">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $result = $result &gt; <xsl:value-of select="@value" /><br />
      </xsl:when>
      <xsl:when test="@op = 'lte'">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $result = $result &lt;= <xsl:value-of select="@value" /><br />
      </xsl:when>
      <xsl:when test="@op = 'gte'">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $result = $result &gt;= <xsl:value-of select="@value" /><br />
      </xsl:when>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="m:string" mode="argument">
    , "<xsl:value-of select="." />"
  </xsl:template>
  <xsl:template match="*" mode="argument">
    , <xsl:value-of select="." />
  </xsl:template>
  <xsl:template match="m:transform" mode="pseudocode">
    <xsl:param name="indent" />
    <xsl:choose>
      <xsl:when test="contains(@name, '_extract')">
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $a = <xsl:value-of select="@name" />($a<xsl:apply-templates select="m:args/*" mode="argument" />);<br />
        <xsl:value-of disable-output-escaping="yes" select="$indent" />set $b = <xsl:value-of select="@name" />($b<xsl:apply-templates select="m:args/*" mode="argument" />);
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of disable-output-escaping="yes" select="$indent" />
        <xsl:choose>
          <xsl:when test="contains(preceding-sibling::m:transform[1]/@name, '_extract')">
            var $result = <xsl:value-of select="@name" />($a, $b<xsl:apply-templates select="m:args/*" mode="argument" />);
          </xsl:when>
          <xsl:otherwise>
            set $result = <xsl:value-of select="@name" />($result<xsl:apply-templates select="m:args/*" mode="argument" />);
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
    <br />
  </xsl:template>

  <xsl:template match="m:attribute">
    <h3>
      <a name="score_{@id}" />
      <a name="a2{position()}" />
      2.<xsl:value-of select="position()" />. <xsl:value-of select="@property" />
      <xsl:if test="@id">
        (<xsl:value-of select="@id" />)
      </xsl:if>
    </h3>
    <h4>
      <a name="a2{position()}1" />

      2.<xsl:value-of select="position()" />.1. Summary
    </h4>

    <table class="table table-border">
      <thead>
        <tr>
          <th>
            Property Path
          </th>
          <td>
            <code>
              <xsl:value-of select="translate(@property, ' ', '|')" />
            </code>
          </td>
        </tr>

        <tr>
          <th>
            When Null
          </th>
          <td>
            <xsl:choose>
              <xsl:when test="@whenNull = 'zero'">Score as 0</xsl:when>
              <xsl:when test="@whenNull = 'none'">Take no action</xsl:when>
              <xsl:when test="@whenNull = 'match'">Score as match</xsl:when>
              <xsl:when test="@whenNull = 'nonmatch'">Score as non-match</xsl:when>
              <xsl:when test="@whenNull = 'ignore'">Ignore attribute (reducing total possible score)</xsl:when>
              <xsl:when test="@whenNull = 'disqualify'">Disqualify the candidate</xsl:when>
            </xsl:choose>
          </td>
        </tr>

        <tr>
          <th>
            M
          </th>
          <td>
            <xsl:value-of select="@m" />
          </td>
        </tr>

        <tr>
          <th >U</th>
          <td>
            <xsl:value-of select="@u" />
          </td>
        </tr>

        <xsl:if test="m:when">
          <tr>
            <th>Depends On:</th>
            <td>
              <table>

                <xsl:for-each select="m:when/m:attribute">
                  <tr>
                    <td>
                      <a href="#score_{@ref}">
                        <xsl:value-of select="@ref" />
                      </a>
                    </td>
                    <td>
                      <xsl:call-template name="pretty-operator">
                        <xsl:with-param name="op" select="@op" />
                      </xsl:call-template>
                    </td>
                    <td>
                      <xsl:value-of select="@value" />
                    </td>
                  </tr>
                </xsl:for-each>
              </table>
            </td>
          </tr>
        </xsl:if>
      </thead>
    </table>

    <a href="#top">Back to Top</a>

    <h4>
      <a name="a2{position()}2" />

      2.<xsl:value-of select="position()" />.2. Assertions
    </h4>
    <p>This section illustrates the assertions which are executed and evaluated against the values in A and B to obtain a score.</p>
    <xsl:apply-templates select="m:assert" mode="table" />

    <a href="#top">Back to Top</a>

    <h4>
      <a name="a2{position()}3" />

      2.<xsl:value-of select="position()" />.3. Partial Scoring
    </h4>

    <xsl:choose>
      <xsl:when test="m:partialWeight">
        <p>
          This attribute has a partial weight configured. This partial weight is used to indicate how the score of this attribute should be modified when the assertions
          agree, however the exact value of A and B are not the same.
        </p>
        <xsl:apply-templates select="m:partialWeight" mode="table" />
      </xsl:when>
    </xsl:choose>
    <a href="#top">Back to Top</a>

    <h4>
      <a name="a2{position()}4" />

      2.<xsl:value-of select="position()" />.4. Pseudocode
    </h4>

    <p>
      The following pseudocode is generated in a language-neutral manner and is itended to illustrate how the process of scoring this attribute will
      occur.
    </p>
    <xsl:apply-templates select="." mode="pseudocode" />
    <a href="#top">Back to Top</a>
  </xsl:template>

  <xsl:template match="m:assert|m:partialWeight" mode="table">
    <xsl:choose>
      <xsl:when test="@op = 'or' or @op = 'and'">
        <table class="table table-striped">
          <tr>
            <th>
              <xsl:call-template name="pretty-operator">
                <xsl:with-param name="op" select="@op" />
              </xsl:call-template>
            </th>
            <td>
              <xsl:apply-templates select="m:assert" mode="table" />
            </td>
          </tr>
        </table>
      </xsl:when>
      <xsl:when test="(@op = 'eq' or @op = 'ne') and not(@value)">
        <table class="table table-striped">
          <xsl:if test="m:transform">
            <tr>
              <th>Transform</th>
              <td>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Transform</th>
                      <th>Arguments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:apply-templates mode="table" select="m:transform" />
                  </tbody>
                </table>
              </td>
            </tr>
          </xsl:if>
          <tr>
            <th>Assert</th>
            <td>
              A <xsl:call-template name="pretty-operator">
                <xsl:with-param name="op" select="@op"></xsl:with-param>
              </xsl:call-template>
              B
            </td>
          </tr>
        </table>
      </xsl:when>
      <xsl:otherwise>
        <table class="table">
          <xsl:if test="m:transform">
            <tr>
              <th>Transform</th>
              <td>
                <table class="match-attribute-summary-transform">
                  <thead>
                    <tr>
                      <th>Transform</th>
                      <th>Arguments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:apply-templates mode="table" select="m:transform" />
                  </tbody>
                </table>
              </td>
            </tr>
          </xsl:if>
          <xsl:if test="@op">
            <tr>
              <th>Assert</th>
              <td>
                result <xsl:call-template name="pretty-operator">
                  <xsl:with-param name="op" select="@op"></xsl:with-param>
                </xsl:call-template> <xsl:value-of select="@value" />
              </td>
            </tr>
          </xsl:if>
          <xsl:if test="@name">
            <tr>
              <th>Algorithm</th>
              <td>

                <xsl:value-of select="@name" />
              </td>
            </tr>
          </xsl:if>
        </table>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="m:transform" mode="table">
    <tr>
      <td>
        <xsl:value-of select="@name" />
      </td>
      <td>
        <ul class="m-0">
          <xsl:for-each select="m:args/*">
            <li>
              <xsl:value-of select="." />
            </li>
          </xsl:for-each>
        </ul>
      </td>
    </tr>
    <xsl:if test="position() != last()">
      <tr>
        <td colspan="2" class="text-center alert-primary">THEN</td>
      </tr>
    </xsl:if>
  </xsl:template>
  <xsl:template match="m:blocking">
    <h3>
      <a name="a1{position()}" />

      1.<xsl:value-of select="position()" />. Blocking Instruction <xsl:value-of select="position()" />
    </h3>
    <h4>
      <a name="a1{position()}1" />

      1.<xsl:value-of select="position()" />.1. Summary
    </h4>
    <table class="match-blocking-table">
      <thead>
        <tr>
          <th>When</th>
          <th>Query For</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="m:filter">
          <tr>
            <td>
              <code>
                <xsl:value-of select="@when" />
              </code>
            </td>
            <td>
              <code>
                <xsl:value-of select="text()" />
              </code>
            </td>
            <td>
              <xsl:if test="position() != last()">
                <xsl:value-of select="../@op" />
              </xsl:if>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
    <a href="#top">Back to Top</a>

    <h4>
      <a name="a1{position()}2" />

      1.<xsl:value-of select="position()" />.2. Pseudocode
    </h4>
    <xsl:apply-templates select="." mode="pseudocode" />
    <a href="#top">Back to Top</a>
  </xsl:template>

  <xsl:template name="pretty-operator">
    <xsl:param name="op" />
    <span class="badge badge-info">

      <xsl:choose>
        <xsl:when test="$op = 'eq'"> equal </xsl:when>
        <xsl:when test="$op = 'ne'"> not-equal </xsl:when>
        <xsl:when test="$op = 'gte'"> greater-than-or-equal </xsl:when>
        <xsl:when test="$op = 'gt'"> greater-than </xsl:when>
        <xsl:when test="$op = 'lte'"> less-than-or-equal </xsl:when>
        <xsl:when test="$op = 'le'"> less-than </xsl:when>
        <xsl:when test="$op = 'and'">intersect</xsl:when>
        <xsl:when test="$op = 'or'">union</xsl:when>
      </xsl:choose>
    </span>
  </xsl:template>
</xsl:stylesheet>