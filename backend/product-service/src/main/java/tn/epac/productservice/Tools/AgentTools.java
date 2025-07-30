package tn.epac.productservice.Tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;

@Component
public class AgentTools {

@Tool(description = "Get Info about product")
  public ProductInfo getproductinfo(@ToolParam(description = "product name") String productname)  {return new ProductInfo(productname, 120.0,12);
}}
record ProductInfo(String name,double price, int quantity) {}